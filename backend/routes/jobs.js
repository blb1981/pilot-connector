const express = require('express')
const router = express.Router()

const jobsController = require('../controllers/jobs')

const { checkAuth } = require('../middleware/checkAuth')
const extractFile = require('../middleware/file')

router
  .route('/')
  .post(checkAuth, extractFile, jobsController.createJob)
  .get(jobsController.getJobs)

router
  .route('/:id')
  .get(jobsController.getJob)
  .put(checkAuth, extractFile, jobsController.updateJob)
  .delete(checkAuth, jobsController.deleteJob)

module.exports = router
