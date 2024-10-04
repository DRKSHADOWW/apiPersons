<<<<<<< HEAD
const {info, error} = require('./utils/logger')
const mongoose = require('mongoose')
const {MONGODB_URI} = require('./utils/config')


const connectionString = process.env.MONGODB_URI
=======
const config = require('./utils/config')
const mongoose = require('mongoose');


const connectionString = config.MONGODB_URI_NOTES
>>>>>>> a464fd1e6efbf4eec7a80b98aa9727af674eadd7

  mongoose.connect(connectionString)
  .then(result => {
<<<<<<< HEAD
    info('connected to MongoDB')
=======
    console.log(`connected to MongoDB`)
>>>>>>> a464fd1e6efbf4eec7a80b98aa9727af674eadd7
  })
  .catch(error => {
    error('error connecting to MongoDB:', error.message)
  })

process.on('uncaughtException', () => {
  mongoose.connection.close()
})

