const express = require('express');
const Router = express.Router()

Router.get('/', (req, res) => {
  res.status(200).json({
    PATH: "/subroute",
    ROUTE_NAME: "subroute-index",
    status: 200
  })
})

module.exports = Router;

