const { model, models, Schema, Types } = require('mongoose');
const SHA256 = require("crypto-js/sha256");

const randomInt = (max, min) => Math.floor(Math.random() * (max - min) + min);

module.exports = models.shops || model('shops', new Schema({
  owner: Types.ObjectId,
  info: {
    name: String,
    website: String
  },
  token: {
    status: { type: Boolean, default: false },
    secret: { type: String, default: SHA256(randomInt(999999, 100000) + (new Date()).getTime()).toString() },
    public: { type: String, default: `${randomInt(9999, 1000)}-${(randomInt(9999, 1000) % 1000 === 0 ? 'EEGG' : 'FXPY')}-${randomInt(9999, 1000)}-${randomInt(9999, 1000)}` },
    callback: { type: String, default: null }
  },
  createAt: { type: Date, default: new Date() }

}), 'shops');