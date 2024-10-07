require('./mongo')

const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const router = require('./controllers/persons')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const {requestLogger, unknownEndpoint, errorHandler} = require('./utils/middleware')

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)

app.use('/api/users', usersRouter)
app.use('/api/persons', router)
app.use('/api/login', loginRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app