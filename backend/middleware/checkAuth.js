const jwt = require('jsonwebtoken')

const checkAuth = (req, res, next) => {
  let token
  try {
    // 1) Check to see if token is in the request, if not return 401
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1]
    }
    if (!token || token === 'undefined') {
      return res.status(401).json({
        status: 'fail',
        data: {
          message: 'Authentication failed',
        },
      })
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    req.userData = {
      email: decodedToken.email,
      id: decodedToken.id,
    }
    next()
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      data: {
        message: 'Server error',
      },
    })
  }
}

module.exports = { checkAuth }
