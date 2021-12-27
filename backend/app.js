const express = require('express')
const app = express()
// const bodyParser = require('body-parser')

app.use(express.json())
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded([{ extended: false }]))

// Add the following headers for CORS
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
  console.log(req.body)
  res.send(req.body)
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
