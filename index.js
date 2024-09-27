const config = require('./utils/config')
require('./mongo')
const unknownEndpoint = require('./middleware/unKnownEndPoint')
const logRequestBody = require('./middleware/logRequestBody')
const errorHandler = require('./middleware/errorHandler')
const Person = require('./models/person')
const express = require('express')
const app = express()
app.use(express.static( 'dist'))
const morgan = require('morgan')
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(logRequestBody);
app.use(morgan(':method :url :status :response-time ms - :res[content-length]'))

let persons = []
  
  app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })

  app.get('/info', (request, response, next) => {
    const currentTime = new Date();
    const numberOfPersons = persons.length;
     
    response.send(`
      <p>There are ${numberOfPersons} persons in the phonebook.</p>
      <p>Request received at: ${currentTime.toLocaleTimeString()} on ${currentTime.toLocaleDateString()} </p>
    `).catch(error => next(error))
  })
  
  app.get('/api/persons', (request, response, next) => {
    Person.find({})
      .then(persons => {
      response.json(persons)
   }).catch(error => next(error))
  })

  app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Person.findById(id)
    .then(person =>{
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    }).catch(error => next(error))
  })

  app.delete('/api/persons/:id', (req, res, next) => {
    const id  = req.params.id

    Person.findByIdAndDelete(id)
      .then(result => {
        res.status(204).end()
      }).catch(error => next(error))
  })
  
  app.post('/api/persons', async (request, response) => {
    const body = request.body;
  
    if (!body.name === undefined || !body.number === undefined) {
      return response.status(400).json({ error: 'name and number are required' });
    }try {
      const existingPerson = await Person.findOne({ name: body.name });
  
      if (existingPerson) {
        return response.status(400).json({ error: 'name must be unique' });
      }
  
      const newPerson = new Person({
        name: body.name,
        number: body.number
      });
  
      const savedPerson = await newPerson.save();
      response.json(savedPerson);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Error creating person' });
    }
  });

  app.put('/api/notes/:id', (request, response, next) => {
    const { name, number } = request.body
  
    Person.findByIdAndUpdate(
      request.params.id, 
      { name, number },
      { new: true, runValidators: true, context: 'query' }
    ) 
      .then(updatedNote => {
        response.json(updatedNote)
      })
      .catch(error => next(error))
  })

app.use(unknownEndpoint)
app.use(errorHandler)

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})