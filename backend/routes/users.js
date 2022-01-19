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
            error: err,
          },
        })
      })
  })
})

// TODO: Remove comments from this route
router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    let fetchedUser

    // If email not found
    if (!user) {
      console.log('email not found')
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
        console.log('email found')
        // If passwords don't match
        if (!result) {
          console.log("passwords don't match")
          return res.status(401).json({
            status: 'fail',
            data: {
              message: 'Authentication failed',
            },
          })
        }
        // Password matches, create JWT
        console.log('password matches, create jWT')
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
          },
        })
      })
      .catch((err) => {
        console.log(err)
        // Some other type of error
        console.log('some other type of error')
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
