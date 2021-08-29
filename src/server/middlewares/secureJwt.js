const expressJwt = require('express-jwt');

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 */

module.exports = {
  SECURE_JWT: expressJwt({ secret: process.env.SECRET_TOKEN, algorithms: ['HS256'] }),
  JWT_REDIRECT: (req, res, next) => {

    if (!req.user?._id || req.user?._id !== req.session?.user?._id) {
      req.session.destroy()
      return res.status(200).json({
        status: 401,
        message: "Unauthorized",
        redirect: "/auth/login"
      })
    }

    next();

  },
  use: (app) => {
    app.use(module.exports.SECURE_JWT);
    app.use(module.exports.JWT_REDIRECT);
  }
}
