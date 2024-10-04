const app = require('./app') 
const {PORT} = require('./utils/config')
const {info} = require('./utils/logger')

const server = app.listen(PORT, () => {
  info(`Server running on port ${PORT}`)
})

module.exports = {server}