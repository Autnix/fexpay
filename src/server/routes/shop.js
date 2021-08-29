const express = require('express');
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
    website
  } = req.body;
  const owner = req.session.user._id;

  const token = helper.createToken();

  const shop = new Shop({
    owner,
    info: {
      name,
      website,
    },
    token
  });

  await shop.save();

  res.status(200).json({
    status: 200,
    shop
  })


})

Router.get('/get-all', async (req, res) => {

  const owner = req.session.user._id;

  const shops = await Shop.find({ removed: false, owner });

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
