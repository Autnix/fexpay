const express = require('express');
const Router = express.Router()
const { SECURE_JWT, JWT_REDIRECT } = require('../middlewares/secureJwt');

Router.get('/', (req, res) => {
  res.status(200).json({
    PATH: "/client",
    ROUTE_NAME: "client-index",
    status: 200
  })
})

Router.get('/init', (req, res) => {
  res.json({
    session: req.session
  })
})

Router.get('/check', SECURE_JWT, JWT_REDIRECT, (req, res) => {

  res.status(200).json({
    status: 200,
    details: 'CHECKED!'
  })

})

module.exports = Router;

