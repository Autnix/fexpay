const { model, models, Schema, Types } = require('mongoose')

module.exports =
  models.logs ||
  model(
    'logs',
    new Schema({
      owner: { type: Types.ObjectId, ref: 'users' },
      title: String,
      command: String,
      status: { type: Number, default: 0 },
      logData: { type: Object, default: () => ({}) },
      createAt: { type: Date, default: Date.now },
    }),
    'logs'
  )
