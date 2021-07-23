const express = require('express');
const Router = express.Router()
const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');
const HmacSHA256 = require('crypto-js/hmac-sha256');

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
  console.log(email);

  let user = await User.findOne({ "email": email })

  if (!user) {
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

Router.post("/register", (req, res) => {

  let {
    fullname,
    email,
    password,
    phone,
  } = req.body

  // ! VALIDATION REQURED!

  const salt = uuidv4();
  const pass = HmacSHA256(password, salt).toString();

  let user = new User({
    info: {
      fullname,
      phone,
    },
    email,
    auth: {
      password: pass,
      salt
    },
  })

  user.save();

  res.json({
    user
  })

})

Router.get("/logout", (req, res) => {

  req.session.destroy();
  res.redirect("/auth/login")

})

module.exports = Router;
