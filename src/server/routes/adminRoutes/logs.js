const express = require('express');
const Log = require('../../models/Log');
const Router = express.Router()

Router.get('/', (req, res) => {
  res.status(200).json({
    PATH: "/admin/logs",
    ROUTE_NAME: "admin-logs",
    status: 200
  })
})

Router.get('/list', async (req, res) => {

  const logs = await Log
    .find({}, null, { sort: { createAt: 'desc' }, limit: 300 })
    .populate('owner')
    .catch(e => [])

  res.status(200).json({
    status: 200,
    logs
  })

});


module.exports = {
  Router,
  path: '/logs'
};
