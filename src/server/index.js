require('dotenv').config()
require('./mongo')
const express = require('express')
const app = express()
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const Redis = require('./redis')
const Route = require('./route')
const Shop = require('./models/Shop')
const Helper = require('./helper')

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

app.get('/server-init', (req, res) => {
  res.json({
    session: req.session
  })
})

app.get('/set-data', (req, res) => {
  Redis.set('name', 'Atakan')

  res.json({
    ok: 'OK!'
  })
})

app.get('/demo', async (req, res) => {
  // console.log(req.session);

  const token = Helper.createToken()

  const shop = new Shop({
    owner: req.session?.user?._id,
    info: {
      name: 'TEST URUN',
      website: 'blabla.com'
    },
    token
  })

  await shop.save()

  res.json({
    ok: 'ok'
  })
})

app.get('/get-data', async (req, res) => {
  const data = await Redis.get('name')

  res.json({
    data
  })
})

app.get('/set-session', (req, res) => {
  req.session.name = 'Demo'
  res.json({
    OK: 'OK!'
  })
})

app.get('/get-session', (req, res) => {
  const data = req.session.name

  res.json({
    data
  })
})

module.exports = app
