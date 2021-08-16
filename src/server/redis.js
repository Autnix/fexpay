const Redis = require('ioredis')
const cluster = new Redis(process.env.REDIS_URI || '127.0.0.1:6379', {
  tls: {
    rejectUnauthorized: false
  }
})

cluster.on('connect', () => {
  console.warn('📡 Redis connected!')
})

cluster.on('error', err => {
  console.error(`❌ Redis Connection Failed: ${err}`)
})

module.exports = cluster
