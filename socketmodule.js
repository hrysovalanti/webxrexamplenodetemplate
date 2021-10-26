const ws = require('ws');

function makeWebSocketServer(server){
    const wss= new ws.Server({server});

    //An example here of Arraybuf: Treat this 16 bytes of raw data 
    // let ab= new ArrayBuffer(16);
    // //as an array of floats
    // let fab= new Float32Array(ab);
    // fab[0]=Math.random();
    // fab[1]=Math.random();
    // fab[2]=Math.random();
    // fab[3]=Math.random();
    // //print it
    // console.log("Fab",fab);
    
    //What to do when somebody connects to it: handle each new connection from a client:
    //we deal with all the events inside this eventhandler function, this function is going to be called everytime a new client connects to it
    wss.on('connection', function(client){
        console.log("I got a connection");
    
        //Here is an example of implementing An Array buffer, to use when iterating over a lot of data, numbers, sensor measurments, images
        //and we can treat it as an Array of 32-bit floats or 8bit integers, etc. and we need it on both sides(client&server)
        client.binaryType='arraybuffer';
        //so, we have a new unique client
        //we want to handle the responses with that client separate
        client.on("message", function(buf){
            const msg = buf.toString()
            console.log("I received a message", msg)
            //an arraybuffer
            //client.send(fab);
            //Here we create a new JSON object
            client.send(JSON.stringify({
                cmd:"echo",
                data:"msg"
            }))
        })
        client.on("error",function(err){
            console.error(err)
        })
        client.on("close", function(){
            console.log("client left us")
        })
    })
    
    function sendAllClients(message){
        wss.client.forEach(client=>{
            client.send(message);
        })
    }
}
//here we export this module as a function, and in server.js we will callback this function to connect it with our placeholder in this module, which is our server
module.exports=makeWebSocketServer;
   //having the name like that is just a shortcut of "makeWebSocketServer": makeWebSocketServer
    

//or when you only have one function you can do it this way
//module.exports =makeWebSocketServer