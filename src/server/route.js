const { readdirSync } = require('fs');

const files = readdirSync('./src/server/routes');

module.exports = {
  use: (app) => {

    let md, filename;

    for (const file of files) {

      filename = file.split(".")[0];

      md = require('./routes/' + filename);

      app.use("/" + filename, md);

    }

  }
}
