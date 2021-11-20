const router = require('express').Router()
const path = require('path')
const fs = require('fs')

// GET Route for notes file
router.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/notes.html'))
)

// GET Route for homepage
router.get('/*', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/index.html'))
)

module.exports = router