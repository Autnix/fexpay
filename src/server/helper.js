const SHA256 = require('crypto-js/sha256')

module.exports = {
  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
  },

  createToken() {
    // SHA256(randomInt(999999, 100000) + (new Date()).getTime()).toString()
    const secret = SHA256(
      String(module.exports.randomInt(100000, 999999)) + new Date().getTime()
    ).toString()
    return {
      secret,
      public: `${module.exports.randomInt(1000, 9999)}-${
        module.exports.randomInt(1000, 9999) % 1000 === 0 ? 'EEGG' : 'FXPY'
      }-${module.exports.randomInt(1000, 9999)}-${module.exports.randomInt(
        1000,
        9999
      )}`
    }
  }
}
