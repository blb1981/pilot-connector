const express = require('express')
const router = express.Router()

const Job = require('../models/job')

// Create new job
router.post('/', (req, res) => {
  const job = new Job({
    title: req.body.title,
    content: req.body.content,
  })
  job.save().then((document) => {
    res.status(201).json({
      status: 'success',
      data: {
        job: document,
      },
    })
  })
})

// Get all jobs
router.get('/', (req, res) => {
  Job.find().then((documents) => {
    res.status(200).json({
      status: 'success',
      data: {
        jobs: documents,
      },
    })
  })
})

// Get a single job
router.get('/:id', (req, res) => {
  Job.findById(req.params.id).then((document) => {
    if (document) {
      return res.status(200).json({
        status: 'success',
        data: {
          job: document,
        },
      })
    } else {
      res.status(404).json({
        status: 'fail',
        data: {
          message: 'Could not find job',
        },
      })
    }
  })
})

// Update a job
router.put('/:id', (req, res) => {
  const job = new Job({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
  })
  Job.updateOne({ _id: req.params.id }, job).then((result) => {
    res.status(200).json({
      status: 'success',
      data: null,
    })
  })
})

// Delete a job
router.delete('/:id', (req, res) => {
  Job.deleteOne({ _id: req.params.id }).then((result) => {
    res.status(200).json({
      status: 'success',
      data: null,
    })
  })
})

module.exports = router
