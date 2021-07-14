const Redis = require('ioredis');
const cluster = new Redis([{
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: process.env.REDIS_PORT || 6379
}])
// .then(() => {
//   console.log("📡 Redis connected!")
// }).catch(err => {
//   console.log(`❌ Redis Connection Failed: ${err}`);
// })

module.exports = cluster
