const mongoose = require('mongoose');


let userschema = new mongoose.Schema({
    name:String,
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    groups:[
        {
            gid:{type:mongoose.Types.ObjectId,ref:'group'},gname:{type:String}
        }
    ],
    invites:[
        {grp:String,name:String,grpid:mongoose.Types.ObjectId} 
    ]
   

})

let user = mongoose.model('user',userschema);
user.createIndexes()
module.exports = user;
