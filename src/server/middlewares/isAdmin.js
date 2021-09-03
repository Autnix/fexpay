
/**
 * 
 * @param { import('express').Request } req 
 * @param { import('express').Response } res 
 * @param { import('express').NextFunction } next 
 */

module.exports = (req, res, next) => {

  if (req.session?.user && req.session?.user?.accountRank >= 10)
    return next();

  res.status(401).json({
    status: 401,
    ERR: 'Unauthorized'
  })

}

