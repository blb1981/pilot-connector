const express = require('express')
const router = express.Router()
const multer = require('multer')

const jobsController = require('../controllers/jobs')

const { checkAuth } = require('../middleware/checkAuth')

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
router.post(
  '/',
  checkAuth,
  multer({ storage }).single('image'),
  jobsController.createJob
)

// Get all jobs
// Both page and limit query parameter is required for pagination
router.get('/', jobsController.getJobs)

// Get a single job
router.get('/:id', jobsController.getJob)

// Update a job
router.put(
  '/:id',
  checkAuth,
  multer({ storage }).single('image'),
  jobsController.updateJob
)

// Delete a job
router.delete('/:id', checkAuth, jobsController.deleteJob)

module.exports = router
