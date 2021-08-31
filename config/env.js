module.exports = {
  MONGO_URI: process.env.MONGO_URI,
  CDN_URI: `${process.env.BASE_URL}${process.env.CDN_PATH || '/cdn'}`
};
