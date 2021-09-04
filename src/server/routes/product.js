const express = require('express');
const { Types } = require('mongoose');
const Router = express.Router();
const IsLogin = require('../middlewares/IsLogin');
const SECUREJWT = require('../middlewares/secureJwt');
const Product = require('../models/Product');
const Shop = require('../models/Shop');
const LOGS = require('../logs');


Router.use(IsLogin);

SECUREJWT.use(Router);

Router.get('/', (req, res) => {
  res.status(200).json({
    PATH: '/product',
    ROUTE_NAME: 'product-index',
    status: 200
  })
})

Router.post('/create', async (req, res) => {

  const {
    code,
    title,
    description,
    image,
    priceCC,
    shop
  } = req.body;

  const owner = req.session.user._id;


  // * Required Check
  if (!title || !description || !image || !priceCC || !code || !shop) {
    return res.status(400).json({
      status: 400,
      error: "Lütfen tüm gerekli alanları doldurduğunuzdan emin olun!"
    })
  }

  if (!Types.ObjectId.isValid(shop)) {
    return res.status(401).json({
      status: 401,
      error: 'Geçersiz parametre (shop)'
    })
  }

  let foundedShop = await Shop.find({ _id: shop, owner, status: 1 });

  if (!foundedShop)
    return res.status(404).json({
      status: 404,
      error: "Mağaza bulunamadı!"
    })

  foundedShop = foundedShop[0];

  const product = new Product({
    owner,
    shopId: foundedShop._id,
    code,
    info: {
      title,
      description,
      image
    },
    billing: {
      priceCC
    }
  });

  const systemLog = await LOGS.push(301, { product_id: product._id, data: product.toObject() }, owner);

  const createdProduct = await product.save().catch((e) => false)

  if (createdProduct !== product) {
    res.status(501).json({
      status: 501,
      error: "Beklenmedik bir hata meydana geldi. Lütfen daha sonra tekrar deneyin!"
    });
    await LOGS.status('decline', systemLog);
    return false;
  }

  await LOGS.status('success', systemLog);

  res.status(200).json({
    status: 200,
    product
  })


})

Router.post('/get', async (req, res) => {

  const {
    id
  } = req.body;

  const owner = req.session.user._id;


  if (!id)
    return res.status(404).json({
      status: 404,
      error: 'Geçersiz istek!'
    })

  if (!Types.ObjectId.isValid(id)) {
    return res.status(401).json({
      status: 401,
      error: 'Geçersiz parametre (id)'
    })
  }

  // let shop = await Shop.find({ status: 1, owner, _id: id });

  let product = await Product.find({ status: 1, owner, _id: id });

  if (!product)
    return res.status(401).json({
      status: 401,
      error: 'Yetkisiz istek veya mağaza bulunamadı!'
    })

  product = product[0].toObject();

  product.shop = await Shop.findById(product.shopId)

  res.status(200).json({
    status: 200,
    product
  })

});

Router.get('/get-all', async (req, res) => {

  const owner = req.session.user._id;

  const products = await Product.find({ status: 1, owner });

  res.status(200).json({
    status: 200,
    products
  })


});

Router.post('/remove', async (req, res) => {

  const {
    _id
  } = req.body;

  const owner = req.session.user._id;

  const systemLog = await LOGS.push(302, { product_id: _id }, owner);

  const updatedProduct = await Product.findOneAndUpdate({
    _id,
    owner
  }, { status: 0 }).catch(e => false)

  if (!updatedProduct) {
    res.status(501).json({
      status: 501,
      error: "Beklenmedik bir hata meydana geldi. Lütfen daha sonra tekrar deneyin!"
    });
    await LOGS.status('decline', systemLog);
    return false;
  }

  await LOGS.status('success', systemLog);
  res.status(200).json({
    status: 200,
    _id
  })

})

module.exports = Router
