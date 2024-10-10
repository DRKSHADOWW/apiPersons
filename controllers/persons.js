const router = require('express').Router()
const Person = require('../models/person')
const User = require('../models/user')
const {tokenExtractor} = require('../utils/middleware')

router.get('/', async (request, response) => {
  const persons = await Person
  .find({}).populate('user', {username: 1, name: 1})
  response.json(persons)
})

router.get('/:id', async (request, response) => {
  const id = request.params.id

    const person = await Person.findById(id)
    if (!person) {
      response.status(404).end()
    } else {
      response.json(person)
    }
})

router.post('/', tokenExtractor, async (request, response, next) => {
  const {name, number} = request.body

  const {userId} = request
  const user = await User.findById(userId)

  if (!name || !number) {
    return response.status(400).json({ error: 'name anad number are fields requerided' })
  }

  const existingPerson = await Person.findOne({ name: name })

  if (existingPerson) {

    existingPerson.number = number
    await existingPerson.save()
    response.json(existingPerson)

  } else {

    const newPerson = new Person({
      name,
      number,
      //important: body.important === undefined ? false : body.important,
      user: user.id

    })
    
      const savedPerson = await newPerson.save()
      user.persons = user.persons.concat(savedPerson._id)//[...user.persons, savedPerson._id]
      await user.save()
      response.status(200).json(savedPerson)
   
  
  }
})

router.delete('/:id',tokenExtractor, async (request, response, next) => {
   const id =  request.params.id
  
      await Person.findByIdAndDelete(id)
      response.status(204).end()
})

router.put('/:id',tokenExtractor, async (request, response) => {
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