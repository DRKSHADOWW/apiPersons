const mongoose = require('mongoose')
const {server} = require('../index')
const assert = require('node:assert')
const {initialPersons, api, getAllPersons, personsInDb, usersInDb} = require('../utils/test_helper')
const Person = require('../models/Person')



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


test('there are two persons', async () =>{
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

  test('a specific person can be viewed', async () => {
    const personsAtStart = await personsInDb()
  
    const personToView = personsAtStart[0]
  
    const resultPerson = await api
      .get(`/api/persons/${personToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    assert.deepStrictEqual(resultPerson.body.name, personToView.name)
    assert.deepStrictEqual(resultPerson.body.number, personToView.number)

  })
  

  test('person without content is not added', async () => {
    const newPerson = {
      name: "albaricoque"
    }
  
    await api
      .post('/api/persons')
      .send(newPerson)
      .expect(400)
  
    const personsAtEnd = await personsInDb()
  
    assert.strictEqual(personsAtEnd.length, initialPersons.length)
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

  // test('a person can be deleted', async () => {
  //   const personsAtStart = await helper.personsInDb()
  //   const personToDelete = personsAtStart[0]
  
  //   await api
  //     .delete(`/api/persons/${personToDelete.id}`)
  //     .expect(204)
  
  //   const personsAtEnd = await helper.personsInDb()
  
  //   const contents = personsAtEnd.map(r => r.content)
  //   assert(!contents.includes(personToDelete.content))
  
  //   assert.strictEqual(personsAtEnd.length, helper.initialpersons.length - 1)
  // })

  test('a person that do not exist can not be deleted', async () =>{
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


