require('dotenv').config();
const express = require('express');
const app = express();
const Route = require('./route');

app.use(express.json());

Route.use(app);

app.get("/", async (req, res) => {

  res.status(200).json({
    PATH: "/",
    ROUTE_NAME: "index",
    status: 200
  })
})

module.exports = app;