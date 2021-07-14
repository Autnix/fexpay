require('dotenv').config();
require('./mongo');
const express = require('express');
const app = express();
const Redis = require('./redis');
const session = require('express-session');
const RedisStore = require('connect-redis')(session)
const Route = require('./route');

app.use(session({
  store: new RedisStore({ client: Redis }),
  secret: 'F3XP4YpoweredbyD4T4F3X',
  resave: false,
  saveUninitialized: false
}))

app.use(express.json());
Route.use(app);

app.get("/", async (req, res) => {

  res.status(200).json({
    PATH: "/",
    ROUTE_NAME: "index",
    status: 200
  })
})

app.get('/set-data', (req, res) => {

  Redis.set("name", "Atakan");

  res.json({
    ok: "OK!"
  })

})


app.get("/get-data", async (req, res) => {

  let data = await Redis.get("name");

  res.json({
    data
  })

})

app.get("/set-session", (req, res) => {

  req.session.name = "Demo";
  res.json({
    "OK": "OK!"
  })

})

app.get("/get-session", async (req, res) => {


  let data = req.session.name;

  res.json({
    data
  })

})

module.exports = app;