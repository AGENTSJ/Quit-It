const express =require('express');
const user = require('../db/models/usermodel');
const group = require('../db/models/groupmodel');
const auth = require('../middleware/auth');
const router = express.Router();
router.use(express.json());

//sent invite
router.get('/',auth,async(req,res)=>{
    let us = await user.findById(req.user._id);
    res.send(us.invites);
})
router.post('/sent',auth,async(req,res)=>{

    let data = req.body;
    console.log(data);
    let gp = await group.findById(data.grpid)
    
    if(gp.admins.includes(req.user._id)){
        try{
            
            let tar_user = await user.findOneAndUpdate({email:data.email},{$push:{invites:{
                name:data.name,
                grp:data.grpname,
                grpid:data.grpid
            }}});
           await gp.updateOne({$push:{userbuffer:tar_user._id}});
            res.send('request sent')
        }catch(e){
            res.send(`error in db tar_user`)
        }
       
    }else{
        res.send('invalid req')
    }

});

router.post('/action',auth,async(req,res)=>{
  
        let data = req.body;

  
    if(data.action==true){
    try{
    let gp = await group.findById(data.grpid);
    
    if(gp.userbuffer.includes(req.user._id)&&!gp.users.includes(req.user._id)){

        await gp.updateOne( 
        { $pull: { userbuffer: req.user._id },
          $push:{users:req.user._id}
        },
        {new:true} );
        
        let member = await user.findByIdAndUpdate(req.user._id,
            {
                $push:{groups:{gid:data.grpid,gname:data.grpname}},
                $pull:{invites:{grpid:data.grpid}}
            },{new:true}) 
            
    res.send('updated')
    }else{
        res.send('cannot join or already there')
    }
    }catch(e){
    res.send(`server error in action ${e}`)
    }
    }else{
    try{

        await group.findByIdAndUpdate( 
            {_id:data.grpid},{ 
            $pull: { userbuffer: req.user._id }},
            {new:true} );
        let member = await user.findByIdAndUpdate(req.user._id,
            {
                $pull:{invites:{grpid:data.grpid}}
            },{new:true})

    res.send('done')
    }catch(e){
    res.send(`error try again ${e}`);
}

    }

})



module.exports = router;