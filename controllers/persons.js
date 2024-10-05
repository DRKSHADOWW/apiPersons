const router = require('express').Router()
const Person = require('../models/person')

router.get('/', async (request, response) => {
  const persons = await Person.find({})
    response.json(persons)
  
})

router.get('/:id', async (request, response, next) => {
  const id = request.params.id

 
    const person = await Person.findById(id)
    if (!person) {
      response.status(404).end()
    } else {
      response.json(person)
    }
  
})

router.post('/', async (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'name anad number are fields requerided' })
  }

  const existingPerson = await Person.findOne({ name: body.name })

  if (existingPerson) {

    existingPerson.number = body.number
    await existingPerson.save()
    response.json(existingPerson)

  } else {

    const person = new Person({
      name: body.name,
      number: body.number
      
    })
    
      const savedPerson = await person.save()
      response.status(200).json(savedPerson)
   
  
  }
})

router.delete('/:id', async (request, response, next) => {
   const id =  request.params.id
   
      await Person.findByIdAndDelete(id)
      response.status(204).end()

      next(error)
    
})

router.put('/:id', async (request, response, next) => {
  const body = request.body
  const id = request.body.id

  const newPerson = {
    name: body.name,
    number: body.number
  }

  const updatePerson = await Person.findByIdAndUpdate(id, newPerson, { new: true })
  response.json(updatePerson)
   
    
})

module.exports = router