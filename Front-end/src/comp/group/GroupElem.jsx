
// import React, { useContext, useReducer, useEffect, useRef} from "react";
// import { auth } from "../../context/context";
// import Message from "./Message";


// function GroupElem(params) {
//   let socket = params.socket;
//   let ipref= useRef(0);
//   let sndbtn = useRef(0);
//     let token = useContext(auth);
//     let [grpstates, changegrpstates] = useReducer(
//       (grpstates, action) => {
//         return { ...grpstates, ...action };
//       },
//       { grpclick: null, messages: [] }
//     );
    
//   //handle when group is clicked
//   useEffect(msglist,[grpstates.messages])
//     async function touch() {
//       let res = await fetch("http://127.0.0.1:80/message/get", {
//         method: "post",
//         headers: {
//           "auth-token": token,
//           "content-type": "application/json",
//         },
//         body: JSON.stringify({
//           grpid: params.props.gid,
//         }),
//       });
//       let buffer = await res.json();
  
//       changegrpstates({ grpclick: true, messages: [...buffer.content] });
//     }
//     function send(){
//       let data = {
//         message:ipref.current.value,
//         grpid:params.props.gid,
//         sender:token,
//         time:new Date(),

//       }
//       socket.emit("Grp-msg",data)
//       changegrpstates({messages:[...grpstates.messages,{
//         message:ipref.current.value,
//         grpid:params.props.gid,
//         sender:{
//           name:'you'
//         },
//         time:new Date(),

//       }]})
//     }
//     function msglist(){
//       console.log('insie msglist');
//       socket.on("grp-recive", (data)=>{
//         console.log(data);
//         if(data.grpid===params.props.gid){
//           changegrpstates({messages:[...grpstates.messages,data]})
//         }
//       })
//     }
//     //if grp is not clicked hide msg
//     if (grpstates.grpclick == null) {
//       return (
//         <>
//         <div className="grpwrap" onClick={touch}>
//           <h3>{params.props.gname}</h3>
//         </div>
//         </>
//       );
//     } else {//show msg
//       return (
//         <>
//           <button
//             onClick={() => {
//               changegrpstates({ grpclick: null });
//             }}
//           >
//             back
//           </button>
//           <div className="msgcont">
//             {grpstates.messages.map((e) => {
//               return (
//                 <Message props={e} />
//               );
//             })}
//             <input type="text" name="" id=""  ref={ipref}/>
//             <button ref={sndbtn} onClick={send}>send message</button>
            
//             <button>exit</button>
//           </div>
//         </>
//       );
//     }
//   }

//   // export default GroupElem 
  