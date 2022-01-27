const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

router.post('/register', (req, res) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      email: req.body.email,
      password: hash,
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
      .catch((err) => {
        res.status(400).json({
          status: 'fail',
          data: {
            message: 'Invalid username or password',
            error: err,
          },
        })
      })
  })
})

router.post('/login', (req, res) => {
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
})

module.exports = router
