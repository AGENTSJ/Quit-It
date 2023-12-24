import { useReducer,useRef } from 'react';
import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';


function Form(){
  const ip = useRef(null)
  // const[cont , setcont]=useState(0)
  // const [states,changestate]=useReducer((states,action)=>{return{states,cont:action.cont}},{cont:0})
  const [states,changestate]=useReducer((states,action)=>{console.log(states); return{...states,...action}},{cont:0,temp:0})
  return(
    <>
    <input type="text" ref={ip}/>
    <button onClick={()=>{changestate({cont:ip.current.value})}}>click me</button>
    <button onClick={()=>{changestate({temp:ip.current.value})}}>click me</button>
    <h1>1st button{states.cont}</h1>
    <h1>2nd button{states.temp}</h1>
    </>
  )
}
function Trial(){
  const[state,changestate]=useReducer((state,action)=>{console.log(action); return{...state,...action}},{state1:'ert',state2:'hello'})
  //usereducer need to know what the old states are and also need to know what changed
  //...action returns the list of changes that is made it compars it with ...states which is the old state
  //can also return the value instedad of ...action by return(...sates, state1:action.value)
  console.log(state.state2);
  return (
    <>
   <h1>{state.state2}</h1>
   <h1>{state.state1}</h1>
   <button onClick={()=>{changestate({state2:"hellowwww"})}}>2</button>
   <button onClick={()=>{changestate({type:'ten',state1:'testerrrrr'})}}>1</button>
    </>
  )
}
function Usingref(){
  let id = useRef(null)
  let[user,setuser]=useState(0)
  return(
    <>
    <div className='temp' ref={id} onClick={()=>{setuser(id.current.classList)}}>usingref</div>
    <h2>{user}</h2>
    </>
  )
}
function Timer(){
  let [time,settime]=useState(0);
  useEffect(()=>{
    
    setInterval(() => {
      settime((t)=>{ return t+1});
      
    }, 1000);
  },[])
  return(
    <>
    time:{time}
    </>
  )
}
function Learn() {

  return(
  <>
    <Trial />
    <Form />
    <Usingref />
    <Timer />
    </>
   
  );
}

export default Learn;
