require('dotenv').config()
require('./mongo')
const express = require('express')
const app = express()
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const Redis = require('./redis')
const Route = require('./route')
const LOG = require('./logs');

app.use(
  session({
    store: new RedisStore({ client: Redis }),
    secret: 'F3XP4YpoweredbyD4T4F3X',
    resave: false,
    saveUninitialized: false
  })
)

app.use(express.json())
Route.use(app)

app.get('/', (req, res) => {
  res.status(200).json({
    PATH: '/',
    ROUTE_NAME: 'index',
    status: 200
  })
})

app.get('/log-test', async (req, res) => {

  const log = await LOG.push(301, { product_id: 31, data: { a: 'b' } }, req.session?.user?._id);

  res.status(200).json({ log })


})



module.exports = app
