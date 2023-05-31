const express = require('express');
const cors = require('cors');
const http=require('http')
const {Server} = require('socket.io');
const sauth = require('../middleware/sauth')
const connectdb = require('../db/db');
connectdb();
const app = express()
app.use(cors())

let group = require('../db/models/groupmodel')
let user = require('../db/models/usermodel')


const server = http.createServer(app)

const io =new Server(server,{
    cors:{
        origin:"*"
    }
})

let joined = new Map()

io.on("connection", (socket) => {
   
    
    socket.on("team-ver",async(data)=>{
      
        let token = await sauth(data)
        joined.set(token._id,socket.id)
        
    })
    socket.on("join_room", (data) => {
      // console.log(joined);
    });
  
    // socket.on("send_message", async (data) => {
    //   socket.to(joined.get('64303e26ab13f567df4f0d88')).emit("receive_message", data);
    //   console.log(data);
    // });

    socket.on("Grp-msg", async(data)=>{
      try{
         let users = await group.findById(data.grpid);
         let id = await sauth(data.sender);
         let member = await user.findById(id).select('name _id')
        //  console.log(data);
        //  console.log(member);

         let members = users.users.map((e)=>{
          return e.toString();
         });
         let sockets = members.map((e)=>{
          return joined.get(e)
         })
        //  console.log(data);
        let packet = {
          grpid:data.grpid,
          sender:member,
          message:data.message,
          time:data.time

        }
         socket.to(sockets).emit("grp-recive" ,packet)
        // console.log(packet);

      }catch(e){
        console.log(e);
      }
    })
    

    socket.on("disconnect", () => {
      // console.log("User Disconnected", socket.id);
    });

  });



server.listen(2000,()=>{
    console.log('socket in port 2000')
})

