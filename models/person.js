
const {Schema, model } = require('mongoose')

const personSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  },
  number: {
    type: String,
    required: true,
    match: /^\d{2,3}-\d{7,8}$/
  }
}, { validateBeforeSave: true })

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

 const Person = model('Person', personSchema);
 module.exports = Person