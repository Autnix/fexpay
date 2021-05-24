const axios = require('./modules/axios')
const pwa = require('./modules/pwa')

module.exports = [
    ['@nuxtjs/axios', axios],
    ['@nuxtjs/pwa', pwa],
];
