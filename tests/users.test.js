const bcrypt = require('bcrypt')
const User = require('../models/user')
const {api, usersInDb} = require('../utils/test_helper')
const assert = require('node:assert')

describe('GET ALL api/users', () =>{
    test('usres get all to JSON', async  ()=>{
        await api 
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
})




    describe('when there is initially one user in db', () => {
        beforeEach(async () =>{
            await User.deleteMany()

            const passwordHash = await bcrypt.hash('sekret', 10)
            const user = new User({ username: 'root', passwordHash })

            await user.save()
        })

      
      test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await usersInDb()
    
        const newUser = {
          username: 'mluukkai',
          name: 'Matti Luukkainen',
          password: 'salainen',
        }
    
        await api
          .post('/api/users')
          .send(newUser)
          .expect(201)
          .expect('Content-Type', /application\/json/)
    
          const usersAtEnd = await usersInDb()
          assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
      
          const usernames = usersAtEnd.map(u => u.username)
          assert(usernames.includes(newUser.username))
      })
    
      test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await usersInDb()
    
        const newUser = {
          username: 'root',
          name: 'Superuser',
          password: 'salainen',
        }
    
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
    
        const usersAtEnd = await usersInDb()
        assert(result.body.error.includes('expected `username` to be unique'))
    
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
      })
    
      
    })
