const { model, models, Schema, Types } = require('mongoose')

module.exports =
  models.shops ||
  model(
    'shops',
    new Schema({
      owner: Types.ObjectId,
      info: {
        name: String,
        website: String
      },
      token: {
        status: { type: Boolean, default: false },
        secret: { type: String, required: true },
        public: { type: String, required: true },
        callback: { type: String, default: null }
      },
      createAt: { type: Date, default: Date.now },
      removed: { type: Boolean, default: false }
    }),
    'shops'
  )
