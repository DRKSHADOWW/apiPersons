const mongoose = require('mongoose')
const {server} = require('../index')
const assert = require('node:assert')
const {initialPersons, api, getAllPersons} = require('../utils/helpers')
const Person = require('../models/person')

beforeEach(async()=>{
  await Person.deleteMany({})

  //pararell
  // const personObjects = initialPersons.map(person => new Person(person))
  // const promise = personObjects.map(person => person.save())
  // await Promise.all(promise)

  // secuential
  for(const person of initialPersons){
    const personObject = new Person(person)
    await personObject.save()
  }

  // const person1 = new Person(initialPersons[0])
  // await  person1.save()

  // const person2 = new Person(initialPersons[1])
  // await  person2.save()

})

describe('GET all persons', () =>{
  
test('persons are returned as json', async() => {
  await api 
    .get('/api/persons')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})


test('there are two notes', async () =>{
  const {response} = await getAllPersons()
  expect(response.body).toHaveLength(initialPersons.length)
})
})

describe('POST /api/persons', () =>{
  test('the first is about andrescalchimi', async () =>{
    const {content} = await getAllPersons()
    expect(content).toContain('andrescalchimi')
  })
  

  test('a valid person can be added', async () =>{
    const newPerson = {
      name: 'andrescalchimi3',
      number: 12123456789
    }
  
    await api
    .post('/api/persons')
    .send(newPerson)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
    const {response, content} = await getAllPersons()
    assert.strictEqual(response.body.length,  initialPersons.length + 1)
    assert(content.includes('andrescalchimi3'))
  
  })

  test('person without content is not added', async () =>{
    const newPerson = {name:"test"}
  
    await api
    .post('/api/persons')
    .send(newPerson)
    .expect(400)
  
    const {response} = await getAllPersons()
    assert.strictEqual(response.body.length, initialPersons.length)
  })

  test('updates existing person', async () => {
    const existingPerson = new Person({
      name: 'carmelo diaz',
      number: 1234567890
    })

    await existingPerson.save()

    const updatedNumber = 9876543210

    const updatePerson = {
      name: 'carmelo diaz',
      number: updatedNumber
    }

    await api
      .post('/api/persons')
      .send(updatePerson)
      .expect(200)

    const updatedPerson = await Person.findOne({ name: 'carmelo diaz' })
    expect(updatedPerson.number).toBe(updatedNumber)
  })
  

})

describe('DELETE  /api/persons/:id', () =>{
  test('a person can be deleted', async () =>{
    const {response: firstResponse} = await getAllPersons()
    const {body: persons} = firstResponse
    const personToDelete = persons[0]
  
      await api.delete(`/api/persons/${personToDelete.id}`)
      expect(204)
  
    const {content,response:  secondResponse} = await getAllPersons()
  
    // assert.strictEqual(secondResponse.body.length, persons.length - 1)
    expect(secondResponse.body).toHaveLength(initialPersons.length -1)
    expect(content).not.toContain(personToDelete.content)
  })

  test(' a note that do not exist can not be deleted', async () =>{
    await api.delete('/api/persons/1000')
    .expect(400)
  
    const {response} =  await getAllPersons()
    assert.strictEqual(response.body.length, initialPersons.length)
  
  })

})


afterAll(async () => {
  await mongoose.connection.close()
  await server.close()
})


