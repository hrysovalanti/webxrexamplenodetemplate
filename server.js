//Basic Express Code Example from npm read me
// anode module to use path in different ways so as to find directories locally and load them with express to our script, as and in a html static page)
const path = require("path")
//we load the external module ws, where in a websocket server we can have multiple clients connecting to one server.
const ws = require("ws")
//we load the external express module
const express= require('express')

//to load a file, we need it's path, where ./ means the same folder
const socketmodule= require("./socketmodule.js");
console.log("socketmodule",socketmodule);
// //the express module returns a function
const app = express()

//make the port a variable to reuse later
const PORT=3000;
//you give it a path to the file that contains your webpage
//it will allow you to load then into the script locally., we reference it directly in the page.
const PUBLIC_PATH=path.join(__dirname,"public")
app.use(express.static(PUBLIC_PATH))

//
// //get() the path of the server, I will send the message to send()
// app.get('/', function(req, res){
//     //send a message to the console
//     console.log("is there anybody outhere");
//     //send a message to the webserver
//     res.send('Hello World')
// })
//we tell the app to start acting like a server, and listen on port 3000, in the listen() there is another option to include a callback function
const server = app.listen(PORT,function(){
    //with angled ticks we can use javascript expressions in our strings
    console.log(`we are now serving from ${PUBLIC_PATH} at http://localhost:${PORT}`)
})

//here after the app server, we add our WebSocket server for CONTINUOUS COMMUNICATION WITH CLIENTS:


//here we call the module we created, which we exported as a function
const wss = socketmodule(server);
