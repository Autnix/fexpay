const express = require('express');
const app = express();

const { UPLOAD_PUBLIC, UPLOAD_SHOP } = require('./utils/uploads');

app.post('/upload', (req, res, next) => {
  UPLOAD_PUBLIC(req, res, (err) => {
    if (err) {
      console.error(err);
      return res.send("Something went wrong!");
    }
    res.redirect('/uploads/' + req.files[0]?.filename)
  })
});

app.post('/upload/shop', (req, res) => {
  UPLOAD_SHOP(req, res, (err) => {
    if (err) {
      console.error(err);
      return res.status(402).json({
        status: 402,
        message: "Something went wrong!"
      })
    }

    res.status(200).json({
      status: 200,
      message: "file uploaded",
      path: req.files[0]?.filename
    })
  })
})

module.exports = app