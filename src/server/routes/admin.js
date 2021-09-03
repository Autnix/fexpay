const express = require('express');
const Router = express.Router()
const IS_LOGIN = require('../middlewares/isLogin');
const IS_ADMIN = require('../middlewares/isAdmin');

Router.use(IS_LOGIN);
Router.use(IS_ADMIN);

Router.get('/', (req, res) => {
  res.status(200).json({
    PATH: "/admin",
    ROUTE_NAME: "admin-index",
    status: 200
  })
})

module.exports = Router;

