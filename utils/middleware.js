const logger = require('./logger')
const jwt = require('jsonwebtoken')
const {SECRET}  = require('../utils/config')


const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
  }

  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }

  const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    // CastError: response => response.status(400).send({id used is malformed})
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
      return response.status(400).json({ error: 'expected `username` to be unique' })
    } else if (error.name === 'JsonWebTokenError') {
      return response.status(400).send({ error: 'token missing or invalid'})
    } else if (error.name === 'TokenExpiredError') {
      return response.status(401).json({error: 'token expired'})
    } 
  
    next(error)
  }

  const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    
    if(authorization && authorization.toLowerCase().startsWith('bearer')){
      token = authorization.substring(7)
    } else {
      token = null
    }

    const decodedToken = jwt.verify(token, SECRET)
    if(!decodedToken.id  || !token){
      return response.status(401).json({ error: 'token invalid' })
    }
  
  const {id: userId } = decodedToken
  request.userId = userId
  next()
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor
    
}