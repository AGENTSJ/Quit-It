const mongoose = require('mongoose');


let groupschema = new mongoose.Schema({
    name:String,
    admins:[{type:mongoose.Schema.Types.ObjectId,ref:'user'}],
    users:[{type:mongoose.Schema.Types.ObjectId,ref:'user'}],
    userbuffer:[{type:mongoose.Schema.Types.ObjectId,ref:'user'}],
    message:{type:mongoose.Schema.Types.ObjectId,ref:'message'}

})

let group = mongoose.model('group',groupschema);
module.exports = group;
