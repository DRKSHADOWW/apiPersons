const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)


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

  const getAllPersons =  async () => {
     const response = await api.get('/api/persons')

     return {
        content: response.body.map(person => person.name),
        response
     }
  }

  

  module.exports = {initialPersons, api , getAllPersons}