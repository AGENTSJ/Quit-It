import { auth } from "../../context/context";
import { users } from "../../context/context";
import { useContext, useEffect, useRef, useState } from "react";

function Message(params){
    let token = useContext(auth)
    let details = useContext(users)
    let ipref= useRef(0);
    let sndbtn = useRef(0);
    let msgcont = useRef(0);
    let socket = params.socket;
    let grpstates = params.grps.grpstates;
    let setgrpstates = params.grps.setgrpstates;
    let [inclick ,setinclick]=useState(false)
    let tar = useRef()
    useEffect(()=>{params.refer.current.scrollTop = msgcont.current.scrollHeight},[grpstates.messages])


   async function send(){
        let data = {
          message:ipref.current.value,
          grpid:grpstates.current_gid,
          sender:token,
          time:new Date(),
  
        }
        let packet={
          grpid:grpstates.current_gid,
          message:ipref.current.value
        } 
        let res = await fetch('http://127.0.0.1:80/message/sent',{
          method:'post',
          headers:{
            "auth-token":token,
            "content-type": "application/json"
          },
          body:JSON.stringify(packet)
        })
        console.log(await res.text());
        socket.emit("Grp-msg",data)
        setgrpstates({messages:[...grpstates.messages,{
          message:ipref.current.value,
          grpid:grpstates.current_gid,
          sender:{
            name:details.user.name
          },
          time:new Date()
        }]})
      }

    async function invite(){
      console.log();
          if(inclick===false){
            console.log('hi');
            setinclick(true)
          }else{
            let res = await fetch('http://127.0.0.1:80/group/Invite/sent',{
              method:'post',
              headers:{
                "auth-token":token,
                "content-type":"application/json"
              },
              body:JSON.stringify({
                name:details.user.name,
                email:tar.current.value,
                grpid:grpstates.current_gid,
                grpname:grpstates.current_gname
              })
            })
            // console.log(await res.text()) ;
            if(await res.text()==='invalid req'){
              alert('you cannot invite')
            }
            setinclick(false)
          }
      }
      
     async function score(grpstates){
       
        setgrpstates({scoreclick:true})
      }
    return(
        <>
        <div className="grpnamecont" id="ryt">
        <h2>{params.grps.grpstates.current_gname}</h2>
              
        </div>
        <div className="grpnamecont">
        <button onClick={()=>{setgrpstates({current_gid:null,current_gname:null})}}>Back</button>
              {/* <h2>{params.grps.grpstates.current_gname}</h2> */}
              <button onClick={()=>{
                score(grpstates)
              }}>Scores</button>
              <button onClick={invite}>Invite</button>
              {inclick===true?<input type="email" ref={tar} className="invip" placeholder="email" />:<></>}
              
        </div>

        <div className="msgwrap" ref={msgcont}>
        {params.props.map((e)=>{
          
        return(
            <>
            
            {
              details.user.name===e.sender.name?<>
              <div className="wrap">

              <div className="you">
              <h3>{e.message}</h3>
              </div>
              </div>
              </>:
              <>
              <div className="wrap">
              <div className="other">
              <h3>{e.sender.name}</h3>
              <h3>{e.message}</h3>

              </div>
              </div>
              </>  
            }
            </>

        )
        })}
        </div>
        <div className="textar">

        <input type="text" name="" id=""  ref={ipref}/>
        <button ref={sndbtn} onClick={send}>send</button>
        </div>
    </>
    )
}
export default Message