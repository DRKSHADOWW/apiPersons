const logger = require('./logger')
const jwt = require('jsonwebtoken')

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
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
      return response.status(400).json({ error: 'expected `username` to be unique' })
    }
  
    next(error)
  }

  const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    let token = ""
    if(authorization && authorization.toLowerCase().startsWith('bearer')){
      token = authorization.substring(7)
    }
    let  decodedToken = {}
  
    decodedToken = jwt.verify(token, process.env.SECRET)
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