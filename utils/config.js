require('dotenv').config()

const PORT = process.env.PORT
<<<<<<< HEAD
const MONGODB_URI = process.env.MONGODB_URI === 'test'
? process.env.TEST_MONGODB_URI
:  process.env.MONGODB_URI


module.exports = {
    MONGODB_URI,
    PORT
}
=======
// const TEST_MONGODB_URI = process.env.TEST_MONGODB_URI

const MONGODB_URI_NOTES = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI_NOTES
  : process.env.MONGODB_URI_NOTES

module.exports = {PORT, MONGODB_URI_NOTES}
>>>>>>> a464fd1e6efbf4eec7a80b98aa9727af674eadd7
