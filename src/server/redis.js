const REDIS_OPTIONS = {};

if (process.env.DEPLOY === 'HEROKU') {
  REDIS_OPTIONS.tls = {
    rejectUnauthorized: true
  };
}

const Redis = require('ioredis')
const cluster = new Redis(process.env.REDIS_URI || 'redis://127.0.0.1:6379', REDIS_OPTIONS)

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
