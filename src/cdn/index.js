const fs = require('fs');
const express = require('express');
const multer = require('multer');
const app = express();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const dir = './src/client/static/uploads';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    callback(null, dir);
  },
  filename: (req, file, callback) => {
    const ext = file.originalname.split('.')[1];
    if (["htm", "html"].includes(ext)) return;
    callback(null, file.originalname);
  }
});

const upload = multer({ storage }).array('files', 12);

app.post('/upload', (req, res, next) => {

  upload(req, res, (err) => {
    if (err) {
      console.error(err);
      return res.send("Something went wrong!");
    }
    res.redirect('/uploads/' + req.files[0]?.filename)
  })

});

app.get("/", (req, res) => {
  res.write("hello cdn");
  res.end();
})

module.exports = app