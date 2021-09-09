const express = require('express');
const { Types } = require('mongoose');
const Router = express.Router();
const Product = require('../models/Product');
const Method = require('../models/Method');
const Order = require('../models/Order');

Router.post('/get-product', async (req, res) => {

  const {
    code
  } = req.body;

  if (!code) {
    res.status(400).json({
      status: 400,
      error: 'Ürün bulunamadı!'
    })
    return false;
  }

  let product = await Product
    .find({ code, status: 1 })
    .populate('owner')
    .populate('shopId')
    .catch(e => ([]))

  if (!product || product.length === 0) {
    res.status(400).json({
      status: 400,
      error: 'Ürün bulunamadı!'
    })
    return false;
  }

  product = product[0]

  if (product.owner.suspended.status !== 0) {
    res.status(501).json({
      status: 501,
      error: 'Ürüne erişilemiyor veya kaldırılmış!'
    })
    return false
  }

  res.status(200).json({
    status: 200,
    product: product.toObject()
  })

});

Router.post('/get-methods', async (req, res) => {

  let {
    declineMethods
  } = req.body;

  if (!declineMethods) declineMethods = [];

  let methods = await Method.find({ status: 1 });

  methods = methods.filter(method => !declineMethods.includes(method.toObject()._id)).map(method => {
    delete method.title
    return method.toObject()
  })


  res.status(200).json({
    status: 200,
    methods
  })

})

Router.post('/create-order', async (req, res) => {

  const {
    firstname,
    lastname,
    email,
    phone,
    productId
  } = req.body;

  if (!Types.ObjectId.isValid(productId)) {
    return res.status(401).json({
      status: 401,
      error: 'Geçersiz parametre (productId)'
    })
  }

  if (!firstname || !lastname || !email || !phone || !productId) {
    res.status(400).json({
      status: 400,
      error: 'Lütfen tüm alanları doldurduğunuzdan emin olun!'
    })
    return false;
  }

  let product = await Product
    .find({ _id: productId, status: 1 })
    .populate('owner')
    .catch(e => ([]))

  if (!product || product.length === 0) {
    res.status(400).json({
      status: 400,
      error: 'Ürün bulunamadı!'
    })
    return false;
  }

  product = product[0]

  if (product.owner.suspended.status !== 0) {
    res.status(501).json({
      status: 501,
      error: 'Ürüne erişilemiyor veya kaldırılmış!'
    })
    return false
  }

  const order = new Order({
    owner: product.owner._id,
    shop: product.shopId,
    product: product._id,
    customer: {
      fullname: firstname + ' ' + lastname,
      email,
      phone
    },
    billing: {
      price: Number(product.billing.priceCC).toFixed(2)
    },
    status: -1
  })

  const createdOrder = await order.save()
    .catch((e) => false)

  if (createdOrder !== order) {
    res.status(501).json({
      status: 501,
      error: 'Sipariş oluşturulurken bir hata meydana geldi, lütfen daha sonra tekrar deneyin!'
    })
    return false;
  }

  res.status(200).json({
    status: 200,
    orderId: createdOrder._id
  })

});

Router.post('/remove-order', async (req, res) => {

  const {
    orderId
  } = req.body;

  await Order.findByIdAndDelete(orderId);

  res.status(200).json({
    status: 200,
    deletedOrder: orderId
  })

})

module.exports = Router;
