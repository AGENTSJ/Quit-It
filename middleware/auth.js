const user= require('../db/models/usermodel')
const jwt = require('jsonwebtoken');
const jwt_sceret = 'allthisalloveragain'
const auth = async(req,res,next)=>{
    let token = req.header('auth-token');
    if(!token){
        res.send('invalid req');
    }else{
        try{
            
            let data = jwt.verify(token,jwt_sceret);
            req.user = data;
            next()
        }catch(e){
            res.send('invalid auth')
        }
    }
}

module.exports = auth;