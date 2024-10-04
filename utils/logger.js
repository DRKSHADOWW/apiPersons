const info = (...params) => {
<<<<<<< HEAD
  if (process.env.NODE_ENV !== 'test') { 
    console.log(...params)
  }
  }
  
const error = (...params) => {
  if (process.env.NODE_ENV !== 'test') { 
    console.error(...params)
  }
  }
=======
    console.log(...params)
  }
  
const error = (...params) => {
    console.error(...params)
  }
>>>>>>> a464fd1e6efbf4eec7a80b98aa9727af674eadd7
  
module.exports = {
    info, error
}