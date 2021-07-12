const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log("🚀 MongoDB connected!");
  })
  .catch(err => {
    console.log(`❌ MongoDB Connection Failed: ${err}`);
  })

