const { model, models, Schema, Types } = require('mongoose')

module.exports =
  models.shops ||
  model(
    'shops',
    new Schema({
      owner: { type: Types.ObjectId, ref: 'users' },
      status: { type: Number, default: 1 },
      info: {
        name: String,
        website: String
      },
      images: {
        logo: { type: String, default: null },
      },
      token: {
        status: { type: Boolean, default: false },
        secret: { type: String, required: true },
        public: { type: String, required: true },
        callback: { type: String, default: null }
      },
      createAt: { type: Date, default: Date.now }
    }),
    'shops'
  )
