const mongoose = require('mongoose');
const APP_ENV = require('../../config/env');

mongoose.connect(APP_ENV.MONGO_URI, { useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })
  .then(() => {
    console.warn("🚀 MongoDB connected!");
  })
  .catch(err => {
    console.error(`❌ MongoDB Connection Failed: ${err}`);
  })

