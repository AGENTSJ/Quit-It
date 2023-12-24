const jwt = require('jsonwebtoken')
const jwt_sceret = 'allthisalloveragain'
async function sauth(auth){
    // console.log(auth);
    let token = auth
    try{
        let data = jwt.verify(token,jwt_sceret);
        return data
    }catch(e){
        // console.log(`${e}`);
    }
}

module.exports=sauth;

