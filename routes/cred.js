const express =require('express');
const user = require('../db/models/usermodel')
const jwt = require('jsonwebtoken');
const router = express.Router();
router.use(express.json())

const auth = require('../middleware/auth')

const jwt_sceret = 'allthisalloveragain'


router.post('/createuser',async(req,res)=>{
    let data = req.body;
    try{
    await user.create(data)
        res.send({
            valid:true,
            stmt:"user created"
        })
    }catch(e){
        res.send({
            valid:false,
            stmt:"server error or user already exsist"
        })
    }
})
router.post('/login',async(req,res)=>{
    
    try{
       let logger =  await user.findOne({email:req.body.email});
        if(logger.password==req.body.password){
            let userdata = {
                _id:logger.id
            }
            let authtoken = jwt.sign(userdata,jwt_sceret);

            res.send({
                valid:true,
                authtoken:authtoken
            })
        }else{
            res.send({
                valid:false,
                stmt:'invalid user'
            })
        }
    }catch(e){
        console.log(e);
    }
})
router.get('/verify',auth,async(req,res)=>{
if(req.user._id){
    res.send({
        valid:true
    })
}else{
    res.send({
        valid:false
    })
}
})

module.exports = router