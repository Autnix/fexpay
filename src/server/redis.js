const Redis = require('ioredis')
const cluster = new Redis(process.env.REDIS_URL || 'redis://127.0.0.1:6379')

cluster.on('connect', () => {
  console.warn('📡 Redis connected!');
})

cluster.on('error', err => {
  console.error(`❌ Redis Connection Failed: ${err}`)
})


// cluster.monitor((err, monitor) => {
//   monitor.on("monitor", (time, args, source, database) => {
//     console.warn('📡 Redis Monitor:', `${time}, ${args}, ${source}, ${database}`);
//   });
// });

module.exports = cluster
