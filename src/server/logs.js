const Log = require('./models/Log');
const LIBRARY = require('./log/library');

module.exports = {

  // eslint-disable-next-line no-async-promise-executor
  push: (id, _content, owner) => new Promise((resolve, reject) => {

    const template = { ...LIBRARY[id] };

    template.alias.forEach(alias => {

      template.title = template.title.replace(`%${alias}%`, _content[alias]);

    })

    delete template.alias;
    template.owner = owner;

    if (_content?.data) template.logData = _content.data

    const log = new Log(template);

    log.save().then(savedLog => {
      if (savedLog !== log) reject(Error("Database Error!"));
      else resolve(log);
    })

  }),

  status: (st, _log) => new Promise((resolve, reject) => {
    Log.findByIdAndUpdate(_log._id, {
      status: (st === 'success') ? 1 : -1
    }, (err, log) => {
      if (err) {
        console.error(err);
        reject(Error("Database Error!"));
      }
      resolve(log);
    })
  }),

  setData: (data, _log) => new Promise((resolve, reject) => {

    Log.findByIdAndUpdate(_log._id, {
      logData: data
    }, (err, log) => {
      if (err) {
        console.error(err);
        reject(Error("Database Error!"));
      }
      resolve(log);
    })

  })

};
