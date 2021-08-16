const { model, models, Schema } = require('mongoose')

module.exports =
  models.users ||
  model(
    'users',
    new Schema({
      info: {
        fullname: { type: String, required: true },
        phone: String,
        avatarUrl: { type: String, default: '' },
        defaultAvatar: { type: Boolean, default: true }
      },
      email: { type: String, required: true, unique: true },
      auth: {
        password: { type: String, required: true },
        salt: { type: String, required: true },
        verificationCode: { type: Number, required: true }
      },
      accountType: { type: Number, default: 0 },
      betaUser: { type: Number, default: 0 },
      validateUser: { type: Number, default: 0 },
      balance: { type: Number, default: 0 },
      interests: {
        creditCard: { type: Number, default: 0.07 },
        fexpayAccount: { type: Number, defauilt: 0 }
      },
      suspended: {
        status: { type: Number, default: 0 },
        reason: { type: String, default: null }
      },
      bank_accounts: [
        {
          bank: String,
          fullname: String,
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
    }),
    'users'
  )
