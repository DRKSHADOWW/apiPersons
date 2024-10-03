const config = require('./utils/config')
const mongoose = require('mongoose');


const connectionString = config.MONGODB_URI_NOTES

mongoose.connect(connectionString)
  .then(result => {
    console.log(`connected to MongoDB`)
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  });

process.on('uncaughtException', () => {
  mongoose.connection.close()
})

