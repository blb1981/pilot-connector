const jwt = require('jsonwebtoken')

const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, process.env.JWT.SECRET)
    next()
  } catch (err) {
    res.status(401).json({
      status: 'fail',
      data: {
        message: 'Authentication failed',
      },
    })
  }
}

module.exports = { checkAuth }
