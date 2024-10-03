
const {Schema, model } = require('mongoose')

const noteSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  },
  number: {
    type: String,
    required: true,
    // match: /^\d{2,3}-\d{7,8}$/
    validate: {
      validator: function(v) {
        return /^[0-9-]+$/.test(v);
      },
      message: 'Formato de número de teléfono inválido'
    }
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, { validateBeforeSave: true })

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

 const Note = model('Note', noteSchema);
 module.exports = Note