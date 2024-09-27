module.exports = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }