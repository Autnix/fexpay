const head = require('./config/head'),
  css = require('./config/css'),
  env = require('./config/env'),
  plugins = require('./config/plugins'),
  buildModules = require('./config/buildModules'),
  modules = require('./config/modules'),
  build = require('./config/build'),
  serverMiddleware = require('./config/serverMiddleware')

module.exports = {
  srcDir: 'src/client/',
  ssr: true,
  head,
  css,
  env,
  plugins,
  components: true,
  buildModules,
  modules,
  build,
  serverMiddleware,
  server: {
    host: "0.0.0.0"
  }
}