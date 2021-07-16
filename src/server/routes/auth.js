const express = require('express');
const Router = express.Router()
const UserModel = require('../models/User');

Router.get('/', (req, res) => {
  res.status(200).json({
    PATH: "/auth",
    ROUTE_NAME: "auth",
    status: 200
  })
})

// Router.post("/login", (req, res) => {

// })

// Router.post("/register", (req, res) => {

// })

module.exports = Router;
