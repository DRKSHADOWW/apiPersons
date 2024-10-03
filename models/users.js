const mongoose = require('mongoose')
const { Schema, model } = mongoose

const userSchema = new Schema({
  username: String,
  name: String,
  passwordHash: String,
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Note'
    }
  ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    
    // el passwordHash no debe mostrarse
    delete returnedObject.passwordHash
  }
})

const User = model('User', userSchema)

module.exports = User