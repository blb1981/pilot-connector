const jwt = require('jsonwebtoken')

const User = require('../models/user')

exports.createUser = (req, res) => {
  const user = new User(req.body)
  user
    .save()
    .then((document) => {
      res.status(201).json({
        status: 'success',
        data: {
          user: document,
        },
      })
    })
    .catch((error) => {
      res.status(400).json({
        status: 'fail',
        data: {
          message: 'Invalid username or password',
          newErrorMessage: error.errors,
        },
      })
    })
}

exports.login = (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    let fetchedUser

    // If email not found
    if (!user) {
      return res.status(401).json({
        status: 'fail',
        data: {
          message: 'Authentication failed',
        },
      })
    }
    // Email found
    fetchedUser = user
    return bcrypt
      .compare(req.body.password, user.password)
      .then((result) => {
        // If passwords don't match
        if (!result) {
          return res.status(401).json({
            status: 'fail',
            data: {
              message: 'Authentication failed',
            },
          })
        }
        // Password matches, create JWT
        const token = jwt.sign(
          { email: fetchedUser.email, id: fetchedUser._id },
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.JWT_EXPIRES_IN,
          }
        )
        res.status(200).json({
          status: 'success',
          data: {
            token,
            expiresIn: parseInt(process.env.JWT_EXPIRES_IN_SECONDS),
            userId: fetchedUser._id,
          },
        })
      })
      .catch((err) => {
        // Some other type of error
        return res.status(401).json({
          status: 'fail',
          data: {
            message: 'Authentication failed',
          },
        })
      })
  })
}
