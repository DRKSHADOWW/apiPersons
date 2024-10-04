require('./mongo')

const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./controllers/persons')
const {requestLogger, unknownEndpoint, errorHandler} = require('./utils/middleware')

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)

app.use('/api/persons', router)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app