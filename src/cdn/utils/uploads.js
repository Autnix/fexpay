const multer = require('multer');
const { STORAGE_PUBLIC, STORAGE_SHOP } = require('./storages');

module.exports = {
  UPLOAD_PUBLIC: multer({ storage: STORAGE_PUBLIC }).array('files', 12),
  UPLOAD_SHOP: multer({ storage: STORAGE_SHOP, fileSize: 10240000 }).array('files', 1)
};
