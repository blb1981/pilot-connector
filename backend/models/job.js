const mongoose = require('mongoose')

const jobSchema = mongoose.Schema({
  headline: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  compensation: {
    type: String,
    required: true,
  },
  airports: {
    type: String,
  },
  imagePath: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

module.exports = mongoose.model('Job', jobSchema)
