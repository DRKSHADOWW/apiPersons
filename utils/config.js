require('dotenv').config()

const SECRET =  process.env.SECRET || 'default-secret'

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI === 'test'
? process.env.TEST_MONGODB_URI
:  process.env.MONGODB_URI


module.exports = {
    MONGODB_URI,
    PORT,
    SECRET
}
