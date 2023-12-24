import React, { useContext, useEffect,useReducer } from "react";
import { auth } from "../../context/context";
import '../../style/group.css'
import Message from "./Message";
import { useRef } from "react";
import { io } from "socket.io-client";
import Score from "./score"

const socket = io.connect('http://127.0.0.1:2000')
const Groups = () => {
  
  let token = useContext(auth);
   
  let ip =useRef();
  let scrolcont =useRef();
  let [grpstates,setgrpstates] = useReducer((grpstates,action)=>{return({...grpstates,...action})},{
    crt:'Create Group',
    grps:[],
    change:0,
    grpclick:false,
    scoreclick:false,
    messages:[],
    current_gid:null,
    current_gname:null
    })

//joins the joined map in socketserver
const joinRoom = () => {
    let data = yp.current.value

    socket.emit("team-ver", token)
    socket.emit("join_room", data);//just test
};
  useEffect(joinRoom,[])
  useEffect(() => {
        socket.on("receive_message", (data) => {
        console.log(data);
      });
    }, [socket]); 
  useEffect(() => {getgroup()}, [grpstates.change]);
  useEffect(msglist,[grpstates.messages])


    function msglist(){
      socket.on("grp-recive", (data)=>{
        if(data.grpid===grpstates.current_gid){
          setgrpstates({messages:[...grpstates.messages,data]})
        }
      })
    }

  async function getgroup() {
    let res = await fetch("http://127.0.0.1:80/group/getgrp", {
      method: "get",
      headers: {
        "auth-token": token,
        "content-type": "application/json",
      },
    });
    let data = await res.json();
    setgrpstates({grps:[...data]})
  }

  async function grpcreate(){
    if(grpstates.crt==='Create Group'){
     
      setgrpstates({crt:'Create'})
    }else{
      if(ip.current.value!==""){
        
          let res =await fetch('http://127.0.0.1:80/group/create',{
          method:'post',
          headers:{
              "auth-token":token,
              "content-type":"application/json"
          },
          body:JSON.stringify({
              "name":ip.current.value
          })
         })
        let data = await res.text();
        setgrpstates({crt:'Create Group',change:grpstates.change+1})
      
        alert(data)
      }else{
        ip.current.focus()
        
      }

    }
  }

  async function touch(e) {
    let res = await fetch("http://127.0.0.1:80/message/get", {
      method: "post",
      headers: {
        "auth-token": token,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        grpid: e.gid,
      })
    });
    let buffer = await res.json();

    setgrpstates({ grpclick: true, messages: [...buffer.content] ,current_gid:e.gid,current_gname:e.gname});
    
  }

let yp = useRef("placeholder data") 


  return(
      <div className="grpcont">
      <div className="grpnames">
        {
          //draws all groups whith the data rom getgroup fn line 49
          grpstates.grps.map((e)=>{//e contain group id group name etc..
            return(
              <>
              <div className="grpwrap" onClick={()=>{touch(e)}}>
              <h3>{e.gname}</h3>
              </div>
              </>
            )
          })
          
        }
        {grpstates.crt==='Create'?
        <>
        <h4 className="x" onClick={()=>{ setgrpstates({crt:'Create Group'})}}>x</h4>
        <input type="text" ref={ip}/>
        </>
        :<></>}
        
        <button onClick={grpcreate}>{grpstates.crt}</button>
        
      </div>
      {grpstates.current_gid===null?<></>:<>

        <div className="leftcont">

            <div className="grpmsg" ref={scrolcont}>
            <Message props={grpstates.messages} socket={socket} grps={{grpstates,setgrpstates}} refer={scrolcont} />
            </div>
            
            {
              grpstates.scoreclick===false?<></>:<Score grps={{grpstates,setgrpstates}}/>
            }
            

        </div>

      </>
      }
    </div>
    
  )
};

export default Groups;
