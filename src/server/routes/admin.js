const express = require('express');
const Router = express.Router()

Router.get('/', (req, res) => {
  res.status(200).json({
    PATH: "/admin",
    ROUTE_NAME: "admin-index",
    status: 200
  })
})

module.exports = Router;

