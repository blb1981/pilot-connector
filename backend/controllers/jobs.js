const Job = require('../models/job')

exports.createJob = (req, res) => {
  const url = req.protocol + '://' + req.get('host')
  const job = new Job({
    headline: req.body.headline,
    summary: req.body.summary,
    compensation: req.body.compensation,
    airports: req.body.airports,
    // imagePath: url + '/images/' + req.file.filename,
    startDate: new Date(req.body.startDate),
    endDate: new Date(req.body.endDate),
    user: req.userData.id,
  })
  job
    .save()
    .then((document) => {
      res.status(201).json({
        status: 'success',
        data: {
          job: document,
        },
      })
    })
    .catch((error) => {
      res.status(500).json({
        status: 'error',
        message: 'Server error',
      })
    })
}

exports.getJobs = (req, res) => {
  const limit = +req.query.limit // page size
  const page = +req.query.page
  const query = Job.find()
  let fetchedDocuments
  if (limit && page) {
    query.skip(limit * (page - 1)).limit(limit)
  }

  query
    .then((documents) => {
      fetchedDocuments = documents
      return Job.count()
    })
    .then((count) => {
      res.status(200).json({
        status: 'success',
        data: {
          total: count,
          jobs: fetchedDocuments,
        },
      })
    })
    .catch((error) => {
      res.status(500).json({
        status: 'error',
        message: 'Server error',
      })
    })
}

exports.getJob = (req, res) => {
  Job.findById(req.params.id)
    .then((document) => {
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
    .catch((error) => {
      res.status(500).json({
        status: 'error',
        message: 'Server error',
      })
    })
}

exports.updateJob = (req, res) => {
  // let imagePath = req.body.imagePath
  // if (req.file) {
  //   const url = req.protocol + '://' + req.get('host')
  //   imagePath = url + '/images/' + req.file.filename
  // }
  // const job = {
  //   _id: req.body.id,
  //   title: req.body.title,
  //   content: req.body.content,
  //   imagePath,
  //   user: req.userData.id,
  // }

  // Renamed to job2 updates to form
  const job2 = {
    headline: req.body.headline,
    summary: req.body.summary,
    compensation: req.body.compensation,
    airports: req.body.airports,
    // imagePath: url + '/images/' + req.file.filename,
    startDate: new Date(req.body.startDate),
    endDate: new Date(req.body.endDate),
    user: req.userData.id,
  }
  Job.updateOne({ _id: req.params.id, user: req.userData.id }, job2)
    .then((response) => {
      if (response.modifiedCount > 0) {
        res.status(200).json({
          status: 'success',
          data: {
            message: 'Job updated',
          },
        })
      } else {
        res.status(401).json({
          status: 'fail',
          data: {
            message: 'Not authorized',
          },
        })
      }
    })
    .catch((error) => {
      res.status(500).json({
        status: 'error',
        message: 'Server error',
      })
    })
}

exports.deleteJob = (req, res) => {
  Job.deleteOne({ _id: req.params.id, user: req.userData.id })
    .then((response) => {
      if (response.deletedCount > 0) {
        res.status(200).json({
          status: 'success',
          data: {
            message: 'Job deleted',
          },
        })
      } else {
        res.status(401).json({
          status: 'fail',
          data: {
            message: 'Not authorized',
          },
        })
      }
    })
    .catch((error) => {
      res.status(500).json({
        status: 'error',
        message: 'Server error',
      })
    })
}
