const express = require('express');
const Router = express.Router()
const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');
const HmacSHA256 = require('crypto-js/hmac-sha256');
const Redis = require('../redis');

const gsm = require("../netgsm");

Router.get('/', (req, res) => {
  res.status(200).json({
    PATH: "/auth",
    ROUTE_NAME: "auth",
    status: 200
  })
})

Router.post("/login", async (req, res) => {

  let {
    email,
    password
  } = req.body

  let user = await User.findOne({ "email": email })

  if (!user || !user.validateUser) {
    return res.status(403).json({
      status: 403,
      message: "Belirtilen mail adresine ait bir kullanıcı bulunmuyor!"
    })
  }

  let pass = HmacSHA256(password, user.auth.salt).toString();

  if (pass != user.auth.password) {
    return res.status(403).json({
      status: 403,
      message: "Eposta adresi veya şifre hatalı!"
    })
  }

  req.session.user = user

  res.json({
    status: 200,
    user
  })




})

Router.post("/register", async (req, res) => {

  let {
    fullname,
    email,
    password,
    phone,
    phoneFormatted
  } = req.body

  // ! VALIDATION REQURED!

  // ? VALIDATE VALUES

  let phoneValidation = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/gim;
  let emailValidation = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm;


  let validatePhone = phoneValidation.test(phoneFormatted),
    validateEmail = emailValidation.test(email);

  if (!validatePhone)
    return res.status(403).json({
      status: 403,
      message: "Lütfen uygun formatta bir telefon numarası ile tekrar deneyin."
    })

  if (!validateEmail)
    return res.status(403).json({
      status: 403,
      message: "Lütfen uygun formatta bir eposta adresi ile tekrar deneyin."
    })

  // ? IS ALREADY REGISTERED

  let foundUser = await User.find({
    $or: [
      { 'info.phone': phoneFormatted },
      { email }
    ]
  })

  if (foundUser && foundUser.length > 0) {

    foundUser = foundUser[0];

    if (foundUser.validateUser == 0) {
      await User.findByIdAndDelete(foundUser._id);
    } else {
      return res.status(403).json({
        status: 403,
        message: "Belirtilen eposta adresi veya telefon numarasına kayıtlı bir kullanıcı zaten mevcut, lütfen giriş yapmayı deneyin!"
      })
    }

  }


  const salt = uuidv4();
  const pass = HmacSHA256(password, salt).toString();

  let user = new User({
    info: {
      fullname,
      phone: phoneFormatted,
    },
    email,
    auth: {
      password: pass,
      salt
    },
  })

  // * HEROKU DEPLOY CHECK

  if (process.env.DEPLOY == "HEROKU") {
    user.auth.verificationCode = 111111
  }

  // * DATABASE CHECK

  let control = await user.save()
    .then(() => true)
    .catch(err => {
      res.status(403).json({
        status: 403,
        message: "Bilinmeyen bir hata meydana geldi, lütfen daha sonra tekrar deneyin!"
      })
      return false;
    });

  if (!control) return;

  // ? REDIS PHONE NUMBER DEPLOY

  await Redis.set(`register:${user.info.phone}`, JSON.stringify({ code: user.auth.verificationCode, sendAt: (new Date()).getTime() }), "EX", 1800)

  // ? SENDING SMS

  let verificationSms = await gsm.sendCode(phoneFormatted, user.auth.verificationCode)

  verificationSms = verificationSms.slice(0, 2)

  // * NETGSM API CHECK

  if (verificationSms != "00") {
    return res.status(403).json({
      status: 403,
      message: "SMS Gönderiminde bir hata meydana geldi, lütfen daha sonra tekrar deneyin!"
    })
  }

  res.status(200).json({
    user
  })

})

Router.post("/verify-phone", async (req, res) => {

  let {
    phone,
    code
  } = req.body;

  // ? REDIS GET CODE

  let verificationCode = await Redis.get(`register:${phone}`)

  // * REDIS CHECK

  if (!verificationCode) {
    return res.status(403).json({
      status: 403,
      message: `${phone} telefon numarasına kayıtlı bir hesap bulunamadı veya doğuralama için izin verilen süreyi aştınız!`
    })
  }

  verificationCode = JSON.parse(verificationCode).code

  // * CODE CHECK

  if (code != verificationCode) {
    return res.status(403).json({
      status: 403,
      message: `Girilen kod hatalı, farklı bir kod deneyin!`
    })
  }

  // ? DATABASE GET USER

  let unregisteredUser = await User.findOne({ "info.phone": phone })

  // * DATABASE CHECK

  if (!unregisteredUser) {
    return res.status(403).json({
      status: 403,
      message: `Sistemsel bir hata meydana geldi, lütfen tekrar kayır olmayı deneyin!`
    })
  }

  // * CODE CHECK

  if (unregisteredUser.auth.verificationCode != code) {
    return res.status(403).json({
      status: 403,
      message: `Sistemsel bir hata meydana geldi, lütfen tekrar kayır olmayı deneyin!`
    })
  }

  // ? DATABASE SAVE

  unregisteredUser.validateUser = 1;
  await unregisteredUser.save();

  res.status(200).json({
    user: unregisteredUser
  })

})

Router.post("/resend-verification-code", async (req, res) => {

  let {
    phoneFormatted
  } = req.body;

  let phone = phoneFormatted;

  // * REDIS CHECK FOR EXPIRE TIME

  let exp = await Redis.get(`register:${phoneFormatted}`)

  if (exp && (Number(JSON.parse(exp).sendAt) + 25 * 1000) > (new Date()).getTime())
    return res.status(403).json({
      status: 403,
      message: `Doğrulama kodunuzu şuan gönderemiyoruz, lütfen biraz bekleyip tekrar deneyin!`
    })


  // ? DATABASE GET USER

  let unregisteredUser = await User.findOne({ "info.phone": phone })

  // * DATABASE CHECK

  if (!unregisteredUser) {
    return res.status(403).json({
      status: 403,
      message: `Sistemsel bir hata meydana geldi, lütfen tekrar kayır olmayı deneyin!`
    })
  }

  // * USER CHECK

  if (unregisteredUser.validateUser != 0) {
    return res.status(403).json({
      status: 403,
      message: `Kullanıcı zaten telefon numarasını onaylamış, giriş yapmayı deneyin!`
    })
  }

  // ? GENERATE NEW CODE & SAVE DATABASE

  let newCode = process.env.DEPLOY == "HEROKU" ? 111111 : Math.floor((Math.random() * (999999 - 100000) + 100000))

  unregisteredUser.auth.verificationCode = newCode;
  await unregisteredUser.save();

  // ? REDIS SET CODE

  await Redis.set(`register:${unregisteredUser.info.phone}`, JSON.stringify({ code: newCode, sendAt: (new Date()).getTime() }), "EX", 1800)

  // ? SENDING SMS

  let verificationSms = await gsm.sendCode(phoneFormatted, newCode)

  verificationSms = verificationSms.slice(0, 2)

  // * NETGSM API CHECK

  if (verificationSms != "00") {
    return res.status(403).json({
      status: 403,
      message: "SMS Gönderiminde bir hata meydana geldi, lütfen daha sonra tekrar deneyin!"
    })
  }

  res.status(200).json({
    user: unregisteredUser
  })


})

Router.get("/logout", (req, res) => {

  req.session.destroy();
  res.redirect("/auth/login")

})

module.exports = Router;
