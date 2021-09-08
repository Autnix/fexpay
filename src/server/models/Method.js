const { model, models, Schema } = require('mongoose')

module.exports =
  models.methods ||
  model(
    'methods',
    new Schema({
      info: {
        title: { type: String, require: true },
        publicTitle: { type: String, require: true },
        endpoint: { type: String, required: true },
        icon: { type: String, default: 'uil-credit-card' }
      },
      Env: { type: Object, default: () => ({}) },
      order: { type: Number, default: 1 },
      status: { type: Number, default: 1 },
    }),
    'methods'
  )
