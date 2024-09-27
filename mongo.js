require('dotenv').config();
const mongoose = require('mongoose');


const connectionString = process.env.personApp;

mongoose.connect(connectionString)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  });

process.on('uncaughtException', () => {
  mongoose.connection.close()
});

