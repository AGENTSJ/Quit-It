const express =require('express');
const user = require('../db/models/usermodel');
const group = require('../db/models/groupmodel');
const message =require('../db/models/messageModel')
const auth = require('../middleware/auth');
const router = express.Router();
router.use(express.json());

router.use('/Invite',require('./invites'));

router.post('/create',auth,async(req,res)=>{
    if(!req.user){
        res.send('invalid user')
    }else{
        try{
           let msg = await message.create({
               content:[]
           })
           let buffer ={
            name:req.body.name,
            admins:[req.user._id],
            users:[req.user._id],
            userbuffer:[],
            message:msg._id
            }  
            let grp = await group.create(buffer);
            await user.findByIdAndUpdate(req.user._id,{$push:{groups:[
                {
                    gid:grp._id,
                    gname:req.body.name
                }
            ]}},{$push:{users:req.user._id}} , { new: true });
            res.send('group created')
    
        }catch(e){
            res.send('error in db op')
        }
    }
   
})

router.post('/remove',auth,async(req,res)=>{
    let data = req.body;
    let grp = await group.findById(data.gpid);
    if(grp.admins.includes(req.user._id)){
       
        try{
            await grp.updateOne({$pull:{users:data.tar_user}})
             await user.findByIdAndUpdate(data.tar_user,{$pull:{groups:{gid:data.gpid}}})
            res.send('updated')
        }catch(e){
            res.send(`${e}`)
        }
        
    }else{
        res.send('invalid req')
    }
    
})

//exit group and delete grp

router.get('/getgrp',auth,async(req,res)=>{
    try{
       let us= await user.findById(req.user._id)
    //    let us= await user.findById(req.user._id).populate('groups.gid');
      
        res.send(us.groups);
    
    }catch(e){
        res.send(`${e}`)
    }
})


module.exports = router;


