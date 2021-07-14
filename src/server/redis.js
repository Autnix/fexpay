const Redis = require('ioredis');
const cluster = new Redis(process.env.REDIS_URI || "127.0.0.1:6379")

// .then(() => {
//   console.log("📡 Redis connected!")
// }).catch(err => {
//   console.log(`❌ Redis Connection Failed: ${err}`);
// })

module.exports = cluster
