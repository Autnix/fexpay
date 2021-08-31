const { model, models, Schema, Types } = require('mongoose')

module.exports =
  models.products ||
  model(
    'products',
    new Schema({
      owner: Types.ObjectId,
      project: Types.ObjectId,
      status: { type: Number, default: 1 },
      code: { type: String, required: true },
      info: {
        title: String,
        description: String,
        image: { type: String, default: '' }
      },
      billing: {
        priceCC: { type: Number, default: 1.00 },
        declineMethods: { type: Array, default: () => [] }
      },
      customFields: { type: Array, default: () => [] },
      showing: {
        isHidden: { type: Boolean, default: false },
        isDeactive: { type: Boolean, default: false },
      },
      createAt: { type: Date, default: Date.now },
    }),
    'products'
  )
