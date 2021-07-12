module.exports = {
    baseURL: `${process.env.BASE_URL}${process.env.API_PATH || '/api'}`,
    https: process.env.API_SSL || false
};
