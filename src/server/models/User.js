
const { model, models, Schema } = require('mongoose')
// const { v4: uuidv4 } = require('uuid');

module.exports = models.users || model('users', new Schema({
  info: {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    phone: String,
    avatarUrl: { type: String, default: "" }
  },
  auth: {
    email: { type: String, required: true },
    password: { type: String, required: true },
    salt: { type: String, required: true }
  },
  accountType: { type: Number, default: 0 },
  betaUser: { type: Number, default: 0 },
  validate: { type: Number, default: 0 },
  suspended: {
    status: { type: Number, default: 0 },
    reason: { type: String, default: null }
  },
  bank_accounts: [
    {
      bank: String,
      firstname: String,
      lastname: String,
      account_number: String
    }
  ],
  cards: [
    {
      card_number: [Number],
      expirationDate: {
        month: Number,
        year: Number
      },
      name: String,
      brand: Number
    }
  ],
  createAt: { type: Date, default: new Date() }

}), 'users');