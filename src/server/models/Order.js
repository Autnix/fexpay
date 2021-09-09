const { model, models, Schema, Types } = require('mongoose')

module.exports =
  models.orders ||
  model(
    'orders',
    new Schema({
      owner: { type: Types.ObjectId, ref: 'users' },
      shop: { type: Types.ObjectId, ref: 'shops' },
      product: { type: Types.ObjectId, ref: 'products' },
      method: { type: Types.ObjectId, ref: 'methods', default: null },
      customer: {
        fullname: { type: String, require: true },
        email: { type: String, require: true },
        phone: { type: String, require: true },
      },
      billing: {
        price: { type: Number, require: true },
        gain: { type: Number, default: 0 },
      },
      status: { type: Number, default: -1 },
      createAt: { type: Date, default: Date.now },
    }),
    'orders'
  )
