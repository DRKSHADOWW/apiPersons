const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
app.use(cors())
app.use(express.static('dist'))

const logRequestBody = (req, res, next) => {
    if (req.method === 'POST') {
      console.log(`Request body: ${JSON.stringify(req.body)}`);
    }
    next();
  }
  
  app.use(express.json())
  app.use(logRequestBody);
  app.use(morgan(':method :url :status :response-time ms - :res[content-length]'))

let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
      },
      { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
      },
      { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
      },
      { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
      }
  ]
  
 
  app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })

  app.get('/info', (request, response) => {
    const currentTime = new Date();
    const numberOfPersons = persons.length;
     
    response.send(`
      <p>There are ${numberOfPersons} persons in the phonebook.</p>
      <p>Request received at: ${currentTime.toLocaleTimeString()} on ${currentTime.toLocaleDateString()} </p>
      
    `);
  });
  
  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })
  
  app.post('/api/persons', (request, response) => {
      const body = request.body
  
    if (!body.name || !body.number) {
      return response.status(400).json({ 
        error: 'name and number are required' 
    })
    }
    
    const existingPerson = persons.find(person => person.name === body.name);
    
    if (existingPerson) {
      return response.status(400).json({ error: 'name must be unique' });
    }
    
    const person = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * 100000),
    }
    
    persons = [...persons, person]
    
    response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})