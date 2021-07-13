const mongoose = require('mongoose');
const APP_ENV = require('../../config/env');

mongoose.connect(APP_ENV.MONGO_URI, { useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log("🚀 MongoDB connected!");
  })
  .catch(err => {
    console.log(`❌ MongoDB Connection Failed: ${err}`);
  })

