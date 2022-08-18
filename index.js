const http = require('http')
const url = require('url')
const mongoose = require('mongoose')
const Controller = require('./src/user-controller')
const request = require('./request')
const csvWriter = require('./write-csv')

const PORT = 3000




const server = http.createServer((req, res) => {
    //parsed parameters and path name
    const parsedUrlParameters = url.parse(req.url, true).query
    const parsedUrlPathname = url.parse(req.url, true).pathname
    // check for correct path, method and parameters. task 1
    if(parsedUrlPathname === "/user" && req.method === "GET"&& parsedUrlParameters.name && parsedUrlParameters.surname && parsedUrlParameters.age > 18){
        res.end(`Hello ${parsedUrlParameters.name} ${parsedUrlParameters.surname}`)
        // check for correct path, method and parameters. task 2
    } else if(parsedUrlPathname === "/email" && req.method === "POST"){
      Controller.createUser(parsedUrlParameters)
      .then(message => {
        res.end(message)})
        .catch(err =>{
          res.writeHead(404, {"Content-Type": "application/json"})
          res.end(JSON.stringify(err))
        })
    } else if(parsedUrlPathname === "/email" && req.method === "GET"){
      //getting data from database
      Controller.getUser(parsedUrlParameters.email)
      .then(message => {
        //making list uf full names
        userList = []
        for(var i=0; i<message.length;i++){
          userList.push(message[i].name + " " + message[i].surname)
        }
        res.end(JSON.stringify(userList))})
        .catch(err =>{
          res.writeHead(404, {"Content-Type": "application/json"})
          res.end(JSON.stringify(err))
        })
    }
    else if(parsedUrlPathname === 'reqres.in/api/users', req.method === 'GET'){
      //sending request to https://reqres.in/api/users
      request.sendRequest(url.method, `https://${parsedUrlPathname}`)
        .then(data => {
          //creating .csv file
          csvWriter.writeRecords(data.data)})
        .then(()=>{res.end("Done")})
        .catch(err => {
          res.writeHead(404, {"Content-Type": "application/json"})
          res.end(JSON.stringify(err))
        })
    }
     else {
      res.writeHead(404, {"Content-Type": "application/json"})
      res.end(JSON.stringify({message: "Route not found"}))
    }



})

const start = async () => {
  try{
    await mongoose.connect('mongodb+srv://dbUser:123@cluster0.i8wzkzu.mongodb.net/usersDB')
    server.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))
  } catch(e){
    console.log(e)
  }
}
start()
