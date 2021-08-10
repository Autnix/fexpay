// const head = require('./config/head');

import head from './config/head';
import css from './config/css';
import env from './config/env';
import plugins from './config/plugins';
import buildModules from './config/buildModules';
import modules from './config/modules';
import build from './config/build';
import serverMiddleware from './config/serverMiddleware';

export default {
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