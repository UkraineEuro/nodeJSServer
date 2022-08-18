const User = require('./user-model')

const createUser = async (parsedUrlParameters) => {
  return new Promise((resolve, reject) =>{
    //check if parameters are correct
    if(parsedUrlParameters.name && parsedUrlParameters.surname && parsedUrlParameters.email && parsedUrlParameters.age > 18){
          //save to database
          const user = User.create(parsedUrlParameters)
          resolve("Done")
        } else {
          reject('cannot save data')
        }
  })
}

const getUser = async (email) => {
  return new Promise((resolve, reject) =>{
    let foundUsers = User.find({email: email})
    if(foundUsers){
      resolve(foundUsers)
    } else{
      reject(`Users with email ${email} not foud`)
    }
  })
}


module.exports = {
  createUser,
  getUser
}
