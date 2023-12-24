import React, { useContext, useEffect, useReducer } from 'react'
import { auth } from '../context/context'
import '../style/inv.css'

const InviteElm = (params)=>{
    let token = params.token
    // console.log(params);
    async function  action(state){
        
        let buffer = {
            "grpid":params.props.grpid,
            "action":state,
            "grpname":params.props.grp  
    }
            let res = await fetch('http://127.0.0.1:80/group/Invite/action',{
                 method:'post',
                 headers:{
                     "auth-token":token,
                     'content-type':'application/json'
                 },
                 body:JSON.stringify(buffer)
             })
             let data = await res.text();
             if(params.states.invchange===false){
                params.setstates({invchange:true})
             }else{
                params.setstates({invchange:false})
             }
             console.log(data);
    }
    return(
        <>
        
        <div className="inwrap">

            <h3>{"You are Invited to ->  "+params.props.grp}</h3>
            {/* <h4>{"By "+params.props.name}</h4> */}
            <div className="invbtncont">
            <button onClick={()=>{
                action(true)
            }}>Accept</button>
            <button onClick={()=>{
                action(false)
            }}>Reject</button>
            </div>
            
            
        </div>
        </>
    )
}
const Invites = () => {
    let token = useContext(auth);
    let [Doup,setstates] = useReducer((Doup,act)=>{return({...Doup,...act})},{invites:[],invchange:false,flag:true})
    function getinvites(){
        async function temp(){
            console.log('inside invite');
           let res =  await fetch('http://127.0.0.1:80/group/Invite',{
                method:'get',
                headers:{
                    "auth-token":token,
                    'Content-Type': 'application/json'
                }               
            })
            let data = await res.json();
           setstates({invites:[...data]})
        //    console.log(data.length);
        
           if(data.length !==0){
                setstates({flag:false})
           }
        }
        temp();
    }
    useEffect(getinvites,[Doup.invchange,token])
  return (
    <div className="invitecont" >
        {Doup.flag===true?<div className="blank">
            <p>You have no invites currently</p>
        </div>:<></>}
        {
            Doup.invites.map((e)=>{
            return(<InviteElm props={e} token={token} setstates={setstates} states={Doup} />)
            })   
        }
        {Doup.invchange}
    </div>
  )
}

export default Invites