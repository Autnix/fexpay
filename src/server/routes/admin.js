const express = require('express');
const Router = express.Router()
const IS_LOGIN = require('../middlewares/isLogin');
const IS_ADMIN = require('../middlewares/isAdmin');
// const SECURE_JWT = require('../middlewares/secureJwt');
const ROUTE_LOGS = require('./adminRoutes/logs');

Router.use(IS_LOGIN);
Router.use(IS_ADMIN);

// SECURE_JWT.use(Router);

Router.use(ROUTE_LOGS.path, ROUTE_LOGS.Router);

Router.get('/', (req, res) => {
  res.status(200).json({
    PATH: "/admin",
    ROUTE_NAME: "admin-index",
    status: 200
  })
})

module.exports = Router;

