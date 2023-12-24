const mongoose = require('mongoose');

const messageschema = new mongoose.Schema({
    
    content:[
        {
            message:String,
            sender:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
            time:Date
        }

    ]

})


let message = mongoose.model('message',messageschema);

module.exports=message;
