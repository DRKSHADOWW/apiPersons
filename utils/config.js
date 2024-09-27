require('dotenv').config()

const PORT = process.env.PORT
const personApp = process.env.personApp

module.exports = {
    personApp,
    PORT
}