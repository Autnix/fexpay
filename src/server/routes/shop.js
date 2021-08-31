const express = require('express');
const { Types } = require('mongoose');
const helper = require('../helper');
const Router = express.Router();
const IsLogin = require('../middlewares/IsLogin');
const SECUREJWT = require('../middlewares/secureJwt');
const Shop = require('../models/Shop');


Router.use(IsLogin);

SECUREJWT.use(Router);

Router.get('/', (req, res) => {
  res.status(200).json({
    PATH: '/shop',
    ROUTE_NAME: 'shop-index',
    status: 200
  })
})

Router.post('/create', async (req, res) => {

  const {
    name,
    website,
    logo
  } = req.body;

  // * Required Check
  if (!name || !website) {
    return res.status(400).json({
      status: 400,
      error: "Lütfen tüm gerekli alanları doldurduğunuzdan emin olun!"
    })
  }

  const owner = req.session.user._id;

  const token = helper.createToken();

  const shop = new Shop({
    owner,
    info: {
      name,
      website,
    },
    images: {
      logo
    },
    token
  });

  await shop.save();

  res.status(200).json({
    status: 200,
    shop
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

  const shop = await Shop.findById({ status: 1, owner, _id: id });

  if (!shop)
    return res.status(401).json({
      status: 401,
      error: 'Yetkisiz istek veya mağaza bulunamadı!'
    })

  res.status(200).json({
    status: 200,
    shop
  })

});

Router.get('/get-all', async (req, res) => {

  const owner = req.session.user._id;

  const shops = await Shop.find({ status: 1, owner });

  res.status(200).json({
    status: 200,
    shops
  })


});

Router.post('/remove', async (req, res) => {

  const {
    _id
  } = req.body;

  const owner = req.session.user._id;

  await Shop.findOneAndUpdate({
    _id,
    owner
  }, { removed: true })

  res.status(200).json({
    status: 200,
    _id
  })

})

module.exports = Router
