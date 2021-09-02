const fs = require('fs');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  STORAGE_PUBLIC: multer.diskStorage({
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
  }),

  STORAGE_SHOP: multer.diskStorage({
    destination: (req, file, callback) => {
      const dir = './src/client/static/uploads/shop-images';
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      callback(null, dir);
    },
    filename: (req, file, callback) => {
      const ext = file.originalname.split('.')[1];
      if (!["jpg", "jpeg", "gif", "png"].includes(ext)) return;
      callback(null, uuidv4() + '.' + ext);
    }
  }),

  STORAGE_PRODUCT: multer.diskStorage({
    destination: (req, file, callback) => {
      const dir = './src/client/static/uploads/product-images';
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      callback(null, dir);
    },
    filename: (req, file, callback) => {
      const ext = file.originalname.split('.')[1];
      if (!["jpg", "jpeg", "gif", "png"].includes(ext)) return;
      callback(null, uuidv4() + '.' + ext);
    }
  })
};
