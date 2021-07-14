const Redis = require('ioredis');
const cluster = new Redis(process.env.REDIS_URI)
// .then(() => {
//   console.log("📡 Redis connected!")
// }).catch(err => {
//   console.log(`❌ Redis Connection Failed: ${err}`);
// })

module.exports = cluster
