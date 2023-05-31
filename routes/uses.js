const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
router.use(express.json())
const use = require('../db/models/usageModel');
const user = require('../db/models/usermodel');
const group = require('../db/models/groupmodel');
router.get('/',(req,res)=>{
    res.send('hellor');
})
router.get('/add',auth,async(req,res)=>{
let data = req.body;
try{
    
    let check = await use.find({user:req.user._id,date:req.body.date})
    if(check.length==0){
        let total = 0;
        req.body.use.forEach((e)=>{
            total = total+e.count
        })
        await use.create({
            user:req.user._id,
            date:req.body.date,
            use:req.body.use,
            ontrack:req.body.ontrack,
            total:total
        })
    }else{
        let total = 0;
        req.body.use.forEach((e)=>{
            total = total+e.count
        })
        await use.findOneAndUpdate({user:req.user._id,date:req.body.date},{$set:{
            use:req.body.use
            ,total:total
        }})

    }

res.send('data saved')
}catch(e){
    res.send('db error in uses')
console.log(e);
}




})
//sends the user specific details about his usage for the last 7 days
router.get('/getuse',auth,async(req,res)=>{
    try{
        let packet = await use.find({user:req.user._id}).limit(7);
        res.send(packet);
        
    }catch(e){
        res.send('db error try again')
    }
})


module.exports = router;
