const express = require('express');
const router = express.Router();
router.use(express.json());

const group = require('../db/models/groupmodel')
router.post('/getscore',async (req,res)=>{
    let data = req.body;
    if(!req.user){
        res.send('invalid user')
    }else{
        let grp = await group.findById(data.gid).populate('users')
        //sorting the documment based on ontrack days
        try{
            if(grp.users!=null){

                grp.users.sort((a,b)=>{
                    return b.ontrack - a.ontrack 
                })
                
                let scores = grp.users.map((e)=>{
                    // console.log(e);
                    return {
                        ontrack:e.ontrack,
                        id:e._id,
                        name:e.name
                    };
                })
                res.send(scores)
            }
        }catch(e){
            res.send(e)
        }
    }
})

module.exports = router;
