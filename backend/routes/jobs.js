const express = require('express')
const router = express.Router()
const multer = require('multer')

const Job = require('../models/job')

// Helper for file extensions
const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
}

// Image storage settings
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype]
    let error = new Error('Invalid MIME type')
    if (isValid) {
      error = null
    }
    cb(error, 'backend/images')
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-')
    const ext = MIME_TYPE_MAP[file.mimetype]
    cb(null, name + '-' + Date.now() + '.' + ext)
  },
})

// Create new job (with image)
router.post('/', multer({ storage }).single('image'), (req, res) => {
  const url = req.protocol + '://' + req.get('host')
  const job = new Job({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + '/images/' + req.file.filename,
  })
  job.save().then((document) => {
    console.log(document)
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
