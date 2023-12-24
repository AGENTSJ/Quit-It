import React, { useEffect, useRef, useState } from 'react';
import { useContext } from 'react';
import { cred } from '../../context/context';
import { NavLink, json } from 'react-router-dom';
import '../../style/use.css';
import{ auth } from '../../context/context';

function UseElm(params){

  
  let ref = useRef()
  
  useEffect(()=>{
    if(params.props.used===true){
      ref.current.style['background-color']='red';
    }
  },[params.state.use])

  
  function scrollr(ref){
    
    const containerTop = params.conref.current.offsetTop;
    const subContainerTop = ref.current.offsetTop;
    const position = subContainerTop - 300;
    params.conref.current.scrollTo({
      top: position,
      behavior: 'smooth'
    });
    console.log(containerTop);
    console.log(subContainerTop);

  }
  function usemark(e){

    params.state.setuse((old)=>{
      let newa = old.map((e)=>{
        if(e.time===params.props.time){
          e.used=true
          return e 
        }else{
          return e
        }
      })
      return newa
      })
  }
  return(
    <>
    <div className="timeelm" ref={ref} key={params.props.time}onClick={()=>{usemark(params.props.time)}}>
      <h1>{params.props.time}</h1>
 
    </div>
    </>
  )
}

let UsageData=[];
let target=0;

const Usetrack = () => {

  const credn = useContext(cred);
  let token = useContext(auth);

  let dummy = [
      {time:1,count:0,used:false},
      {time:2,count:0,used:false},
      {time:3,count:0,used:false},
      {time:4,count:0,used:false},
      {time:5,count:0,used:false},
      {time:6,count:0,used:false},
      {time:7,count:0,used:false},
      {time:8,count:0,used:false},
      {time:9,count:0,used:false},
      {time:10,count:0,used:false},
      {time:11,count:0,used:false},
      {time:12,count:0,used:false},
      {time:13,count:0,used:false},
      {time:14,count:0,used:false},
      {time:15,count:0,used:false},
      {time:16,count:0,used:false},
      {time:17,count:0,used:false},
      {time:18,count:0,used:false},
      {time:19,count:0,used:false},
      {time:20,count:0,used:false},
      {time:21,count:0,used:false},
      {time:22,count:0,used:false},
      {time:23,count:0,used:false},
      {time:24,count:0,used:false},
    ]

  let[use,setuse]=useState(dummy);
  useEffect(()=>{getdata()},[]);

  //fetches the main data
  async function getdata(){
    let dat = await fetch('http://127.0.0.1:80/use/getuse',{
      headers:{
        "auth-token":token,
        "content-type":"application/json"
    }
    })
    let data = await dat.json()
    
    let newdat =[];
    for(let i=0;i<data.length;i++){//different dates i
    // console.log(data[i]);
    let temp = Array.from(dummy)
    let uses = data[i].use
    for(let j = 0;j<uses.length;j++){//changing dummy data with time as index
      temp[uses[j].time-1]= uses[j]//since time starts with 1 
    }
    newdat.push(temp);
   }if(!(newdat[0].length===0)){

     setuse(newdat[0]);
   }
   UsageData = Array.from(data)//seting the global variable
  
    suggestionEngine();
  }
  function suggestionEngine(){
   let totaluse =  UsageData.map((e)=>{
      return e.total
    })
   
    let avg=0.0;
    totaluse.forEach((e)=>{
      avg = avg+e;

    })
    avg=avg/totaluse.length;
 
    target = Math.floor(avg)
  }
  
  function logout(){
   
      credn.settoken("");
      credn.setlog(false);
      document.cookie="auth-token=;"
  
  }
  let conref = useRef()
  return (
    <>
    <NavLink to='/' ><button onClick={logout}>log out</button></NavLink>
    <div>Usetrack</div>
    <div className="tempcont">

    <div className="usecont" ref={conref}>
    {
      use.map((e)=>{
        return(<UseElm props={e} conref={conref} state={{use,setuse}} target={target}/>)
      })
    }
    </div>
    <div className="actions">
    <div className="back smbtn">back</div>
    <button className='smbtn'>Confirm</button>
    <div className="next smbtn">next</div>
    </div>

    </div>
    </>

  )
}

export default Usetrack