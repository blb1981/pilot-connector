const express = require('express')
const app = express()
const mongoose = require('mongoose')

const Job = require('./models/job')

// Connect to DB
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.izpuw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log('Connected to database')
  })
  .catch(() => {
    console.log('Connection to database failed')
  })

// Middleware
app.use(express.json())

// Headers for CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  )
  next()
})

app.post('/api/jobs', (req, res) => {
  const job = new Job({
    title: req.body.title,
    content: req.body.content,
  })
  console.log(job)
  res.status(201).json({
    message: 'Job added.',
  })
})

app.get('/api/jobs', (req, res) => {
  posts = [
    {
      id: '123f131fadsf',
      title: 'First post',
      content: "This is the first post's content",
    },
    {
      id: '123f131fewrr',
      title: 'Second post',
      content: "This is the second post's content",
    },
    {
      id: '123f131fzxcv',
      title: 'Third post',
      content: "This is the third post's content",
    },
  ]

  res.status(200).json(posts)
})

module.exports = app
