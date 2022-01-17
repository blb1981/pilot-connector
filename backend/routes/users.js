const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

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
          data: document,
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

module.exports = router
