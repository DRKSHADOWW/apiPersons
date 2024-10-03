const config = require('./utils/config')
require('./mongo')
const express = require('express')
const app = express()
// const router = require('./controllers/notes')
const unknownEndpoint = require('./middleware/unKnownEndPoint')
const logRequestBody = require('./middleware/logRequestBody')
const errorHandler = require('./middleware/errorHandler')
const Note = require('./models/note')
require('express-async-errors')
app.use(express.static( 'dist'))
const morgan = require('morgan')
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(logRequestBody)
app.use(morgan(':method :url :status :response-time ms - :res[content-length]'))

let notes = []

// app.use('/api/notes', router)
  
  app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })

  app.get('/info', (request, response, next) => {
    const currentTime = new Date();
    const numberOfnotes = notes.length;
     
    response.send(`
      <p>There are ${numberOfnotes} notes in the phonebook.</p>
      <p>Request received at: ${currentTime.toLocaleTimeString()} on ${currentTime.toLocaleDateString()} </p>
    `).catch(error => next(error))
  })
  
  app.get('/api/notes', async (request, response, next) => {
    // Note.find({})
    //   .then(notes => {
    //   response.json(notes)

    const note = await Note.find({})
    response.json(note)

   })
  

  app.get('/api/notes/:id', (request, response, next) => {
    const id = request.params.id
    Note.findById(id)
    .then(note =>{
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    }).catch(error => next(error))
  })

  app.delete('/api/notes/:id', async (req, res) => {
    const id = req.params.id;
    const note = await Note.findByIdAndDelete(id)

      if (!note) {
        res.status(404).json({ message: 'Note not found' })
      } else {
        res.status(204).end()
      }
    
  })
  
  app.post('/api/notes', async (request, response) => {
    const body = request.body;
  
    if (!body.name || !body.number) {
      return response.status(400).json({ error: 'name and number are required' });
    }
      const existingNote = await Note.findOne({ name: body.name });
  
      if (existingNote) {
        return response.status(400).json({ error: 'name must be unique' });
      }
  
      const newNote = new Note({
        name: body.name,
        number: body.number
      })
      
      const savedNote = await newNote.save()
      response.status(201).json(savedNote)
    
  })

  app.put('/api/notes/:id', (request, response, next) => {
    const { name, number } = request.body
  
    Note.findByIdAndUpdate(
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

const server = app.listen(config.PORT,  () => {
  console.log(`Server running on port ${config.PORT}`)
})

module.exports = {app, server}