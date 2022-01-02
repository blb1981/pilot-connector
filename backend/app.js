const express = require('express')
const app = express()
const mongoose = require('mongoose')

const Job = require('./models/job')

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

// Headers for CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  )
  next()
})

// Create new job
app.post('/api/jobs', (req, res) => {
  const job = new Job({
    title: req.body.title,
    content: req.body.content,
  })
  job.save().then((document) => {
    res.status(201).json({
      message: 'success',
      document,
    })
  })
})

// Get all jobs
app.get('/api/jobs', (req, res) => {
  Job.find().then((documents) => {
    res.status(200).json({ message: 'success', documents })
  })
})

// Get a single job
app.get('/api/jobs/:id', (req, res) => {
  Job.findById(req.params.id).then((document) => {
    if (document) {
      return res.status(200).json({
        status: 'success',
        message: 'Found job',
        data: { job: document },
      })
    } else {
      res.status(404).json({
        status: 'fail',
        message: 'Could not find job',
      })
    }
    res.status(200).json({
      message: 'success',
      job: document,
    })
  })
})

// Update a job
app.put('/api/jobs/:id', (req, res) => {
  const job = new Job({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
  })
  Job.updateOne({ _id: req.params.id }, job).then((result) => {
    res.status(200).json({
      message: 'success',
    })
  })
})

// Delete a job
app.delete('/api/jobs/:id', (req, res) => {
  Job.deleteOne({ _id: req.params.id }).then((result) => {
    res.status(200).json({
      message: 'success',
    })
  })
})

module.exports = app
