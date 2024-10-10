const {info, error} = require('./utils/logger')
const mongoose = require('mongoose')
const {MONGODB_URI} = require('./utils/config')


const connectionString = process.env.MONGODB_URI

  mongoose.connect(connectionString)
  .then(result => {
    info('connected to MongoDB')
  })
  .catch(error => {
    error('error connecting to MongoDB:', error.message)
  })

process.on('uncaughtException', (error) => {
  mongoose.connection.close()
  console.log(error)
})

