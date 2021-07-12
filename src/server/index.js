require('dotenv').config();
const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json());

// fs.readdir("./src/server/routes", (err, files) => {

//   const routes = {};

//   files.forEach(file => {

//     let name = file.split(".")[0]
//     routes[name] = require("./routes/" + name)
//     app.use("/" + name, routes[name])

//   })

// })

app.get("/", async (req, res) => {

  res.status(200).json({
    PATH: "/",
    ROUTE_NAME: "index",
    status: 200
  })
})

module.exports = app;