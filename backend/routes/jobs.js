const express = require('express')
const router = express.Router()

const jobsController = require('../controllers/jobs')

const { checkAuth } = require('../middleware/checkAuth')
const extractFile = require('../middleware/file')

router.post('/', checkAuth, extractFile, jobsController.createJob)
router.get('/', checkAuth, jobsController.getJobs)
router.get('/:id', jobsController.getJob)
router.put('/:id', checkAuth, extractFile, jobsController.updateJob)
router.delete('/:id', checkAuth, jobsController.deleteJob)

module.exports = router
