const path = require('path')
const express = require('express')
const app = express()
const mongoose = require('mongoose')

const jobsRoutes = require('./routes/jobs')
const authRoutes = require('./routes/auth')

// Connect to DB
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.izpuw.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log('Connected to database')
  })
  .catch(() => {
    console.log('Connection to database failed')
  })

// Middleware
app.use(express.json())

// Middleware for image requests
app.use('/images', express.static(path.join('backend/images')))

// Headers for CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  )
  next()
})

app.use('/api/jobs', jobsRoutes)
app.use('/api/auth', authRoutes)

module.exports = app
