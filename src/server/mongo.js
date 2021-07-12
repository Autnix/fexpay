const mongoose = require('mongoose');

console.log(process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, { useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log("🚀 MongoDB connected!");
  })
  .catch(err => {
    console.log(`❌ MongoDB Connection Failed: ${err}`);
  })

