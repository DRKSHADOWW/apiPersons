const logger = require('./logger')

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
    }
  
    next(error)
  }

<<<<<<< HEAD
=======
// logRequestBody = (req, res, next) => {
//     if (req.method === 'POST') {
//       console.log(`Request body: ${JSON.stringify(req.body)}`);
//     }
//     next();
//   }

>>>>>>> a464fd1e6efbf4eec7a80b98aa9727af674eadd7
module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
<<<<<<< HEAD
    
=======
    // logRequestBody
>>>>>>> a464fd1e6efbf4eec7a80b98aa9727af674eadd7
}