const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const Person = require('../models/Person')
const User = require('../models/User')


const initialPersons = [
    {
      name: "andrescalchimi",
      number: 12-12345678
    },
    {
      name: "andrescalchimi2",
      number: 12-123456778
    }
  ]

  //no pertenezca a ningún objeto de nota en la base de datos
  const nonExistingId = async () => {
    const person = new Person({ name: 'willremovethissoon' })
    await person.save()
    await person.deleteOne()
  
    return person._id.toString()
  }

  // verifica las notas almacenadas en la base de datos
  const personsInDb = async () => {
    const person = await Person.find({})
    return person.map(person => person.toJSON())
  }

  const getAllPersons =  async () => {
     const response = await api.get('/api/persons')

     return {
        content: response.body.map(person => person.name),
        response
     }
  }

  // users

  const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }
  

  

  module.exports = {initialPersons, api, usersInDb, getAllPersons, nonExistingId, personsInDb}