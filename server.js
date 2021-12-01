const express = require('express')
const PORT = process.env.PORT || 3001
const app = express()
const noteRoutes = require('./routes/noteRoutes')

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))

app.use('/', noteRoutes)

app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
)