const jwt = require('jsonwebtoken')

const User = require('../models/user')

//TODO: Refactor routes file to be DRY
//TODO: Write catchAsync function for async/await syntax
//TODO: AppError class and implement

exports.createUser = (req, res) => {
  const user = new User({
    companyName: req.body.companyName,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  })

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
  const { email, password } = req.body

  // If email or password are not include in the request
  if (!email || !password) {
    return res.status(400).json({
      status: 'fail',
      data: {
        message: 'Please provide email and password',
      },
    })
  }
  User.findOne({ email })
    .select('+password')
    .then((user) => {
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
        .compare(password, user.password)
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
