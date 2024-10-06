
const {Schema, model } = require('mongoose')

const personSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 10
  },
  number: {
    type: Number,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref:  'User'
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