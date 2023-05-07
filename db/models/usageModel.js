const mongoose = require('mongoose');

const usageschema = mongoose.Schema({
    
    user:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    },
    date:{
        type:String
    },
    use:{
        type:Array
    },
    ontrack:{
        type:Boolean
    },
    total:{
        type:Number
    }
})

let use = mongoose.model('use',usageschema);

module.exports=use;


