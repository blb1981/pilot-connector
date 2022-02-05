const jwt = require('jsonwebtoken')

const User = require('../models/user')

const checkAuth = async (req, res, next) => {
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

    // 2) Verify token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    req.userData = {
      email: decodedToken.email,
      id: decodedToken.id,
    }

    // 3) Make sure user still exists
    const user = await User.findById(decodedToken.id)
    console.log({ user })
    if (!user) {
      console.log('user not found')
      return res.status(401).json({
        status: 'fail',
        data: {
          message: 'Authentication failed',
        },
      })
    }

    // 4) Make sure user's password is still valid
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
