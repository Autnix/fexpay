const PRODUCT_LOG_LIB = require('./lib/product.log');
const SHOP_LOG_LIB = require('./lib/shop.log');

module.exports = {
  ...PRODUCT_LOG_LIB,
  ...SHOP_LOG_LIB
};
