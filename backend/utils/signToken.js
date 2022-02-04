const jwt = require('jsonwebtoken')

const signToken = (id) => {
  console.log('did we make it??')
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
}

module.exports = { signToken }
