require('dotenv').config()

const PORT = process.env.PORT
// const TEST_MONGODB_URI = process.env.TEST_MONGODB_URI

const MONGODB_URI_NOTES = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI_NOTES
  : process.env.MONGODB_URI_NOTES

module.exports = {PORT, MONGODB_URI_NOTES}