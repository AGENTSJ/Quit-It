const mongoose = require('mongoose');

const connectdb =async()=>{
    try{

        await mongoose.connect('mongodb://127.0.0.1:27017/quit-it-adv')
        console.log('connection established');
    }catch{
        console.log('error in connection');
    }
} 

module.exports = connectdb;