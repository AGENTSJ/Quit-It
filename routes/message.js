const message = require('../db/models/messageModel');
const group = require('../db/models/groupmodel');
const auth = require('../middleware/auth');


const express =require('express');
const router = express.Router();
router.use(express.json());



router.post('/sent',auth,async(req,res)=>{
    let data = req.body;
    try{
       
        
        let grp = await group.findById(data.grpid);
        if(grp.users.includes(req.user._id)){

            await message.findByIdAndUpdate(grp.message,{
                $push:{
                    content:{
                        message:data.message,
                        sender:req.user._id,
                        time:new Date()
        
                    }
                }
            })
            res.send('message sent')
        }else{
            res.send('you cannot send messages to this group')
        }
    }catch(e){
        res.send(`error in sending message`)
        console.log(e);
    }
})

router.post('/get',auth,async(req,res)=>{
    let data = req.body;

    try{
        let msg = await group.findById(data.grpid).populate('message')
        await msg.populate('message.content.sender','name');
        if(msg.users.includes(req.user._id)){
            
            res.send(msg.message)
        }else{
            res.send('invalid req in getmsg')
        }
    
    }catch(e){
        res.send(`${e}`)
    }
})


module.exports=router;