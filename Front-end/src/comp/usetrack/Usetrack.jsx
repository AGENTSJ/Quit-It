import React, { useEffect, useReducer, useRef, useState } from 'react';
import { useContext } from 'react';
import { cred } from '../../context/context';
import { NavLink} from 'react-router-dom';
import '../../style/use.css';
import{ auth } from '../../context/context';
import cigsmok from '../../assets/cigsmok.png'
import lighter from '../../assets/lighter.png'


let date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1; // Adding 1 to adjust for zero-based month
const year = date.getFullYear();
let hour = date.getHours();

let UsageData=[];
let limit=-1;
let intv =0;
let packet;
let init=0;

const Usetrack = () => {

  const credn = useContext(cred);
  let token = useContext(auth);
  
   

  let[ustate,setustate]=useReducer((states,action)=>{
  return{ ...states,...action}
  },{
    limit,
    intv,
    suggestion:"Good Luck.. when ever you smoke light here First.."
  })
  
  
  // useEffect(()=>{getdata()},[]);
  // useEffect(()=>{checkLimit()},[ustate.limit])
  // useEffect(hoverEff, []);

  //fetches the main data
  async function getdata(){
    let initcheck = await fetch("http://127.0.0.1:80/use/initcheck",{
      method:'post',
      headers:{
        "auth-token":token,
        "content-type":"application/json"
    }
    })
    init = await initcheck.json();
    checkNew(init.new)
    let dat = await fetch('http://127.0.0.1:80/use/getuse',{
      headers:{
        "auth-token":token,
        "content-type":"application/json"
    }
    })
    let data = await dat.json()
    
    UsageData = data;
  packet = UsageData[0]
    suggestionEngine(UsageData);
    if(UsageData.length===undefined){
      
    }
  }
  
  function suggestionEngine(x){
    let usedtoday
  //  console.log(UsageData);
    let totalarr = UsageData.map((e)=>{
      return e.total;
    })
    // checks if any document of current day is present
    let checker = UsageData.find((e)=>{
      return e.date===`${day}/${month}/${year}`
    })
    // console.log(checker);
    if(checker!==undefined){
      console.log('todays data removed');
      usedtoday =  totalarr.shift();

     
    }else{
      usedtoday=0;
    }
    // console.log(usedtoday);
    
    

    let avg=0.0;
    totalarr.forEach((e)=>{avg = avg+e})
    // console.log(init.init);
    if(totalarr.length===0){
      limit = init.init
    }else{

      limit = Math.floor(avg/totalarr.length)//setting limits
    }
    intv = Math.ceil(12/limit)//assuming a person is active for 12hrs
    // console.log(limit,usedtoday);
    if(x.length===0&&init.new){
      intv = Math.ceil(12/init.init)//not uses this line now
      setustate({limit:init.init,intv:0,suggestion:"Good luck with your journey "})
    }else{
      // console.log("not new");
      setustate({limit:!isNaN(limit)?limit-usedtoday:0,intv:intv,suggestion:`${isNaN(intv)?ustate.suggestion:`Try taking atleast ${intv} hours between each cigarrete`}`})
    }
    if(x.length===0&&init.new===false){
      setustate({limit:init.init})
    }
    if(x.length===1){
      setustate({limit:limit-usedtoday})
    }
    
    

  }
  async function light(){ 
      sData(packet)//send data
      setustate({limit:ustate.limit-1})
  }
  
  async function  sData(sd){
  // console.log(packet);
  
    if(sd===undefined||sd.date!==`${day}/${month}/${year}`){//checking if the packet have todays date on it
      // console.log("packet empty");
      packet = {
        date:`${day}/${month}/${year}`,
        use:[],
        ontrack:ustate.limi<0?false:true
      }
     
    }//ch
    
   let doc = packet.use.find((e)=>{return e.time ===hour})
   
   if(doc===undefined){
    packet.use.push({
      time:hour,
      count:1
    })
   }else{
    doc.count=doc.count+1
   }
   if(ustate.limit<0){
    console.log("over limit",packet);
    packet.ontrack=false;
   }
  //  console.log(packet);
   let Send =  await fetch(`http://127.0.0.1:80/use/add`,{
    method:'post',
    headers:{
      "content-type":"application/json",
      "auth-token":token
    },
    body:JSON.stringify(packet)

   })
   console.log(await Send.text());
  }

  function checkLimit(){
    if(ustate.limit===0){
      setustate({suggestion:"You have reached your limit for today Try not to smoke\n"})
    }
    if(ustate.limit<0){
      setustate({suggestion:"Some days can be more stressfull than others .Dont let one slip up be the reason for an avalanche\n"})
    }
    
  }
  function logout(){
   
      credn.settoken("");
      credn.setlog(false);
      document.cookie="auth-token=;"
  
  }

  //ch
  const hoverEff = () => {
    // console.log("mounts");
    const element = libtn.current;
    let li = burn.current;
    let nelem = neck.current;
    
    const handleMouseOver = (event) => {
        li.style.transform = "translatey(0px)"
        nelem.style.backgroundColor = "rgb(65, 62, 62)"
        nelem.classList.add('temp');
        
    };
    const handleMouseOut = (event)=>{
      

      li.style.transform = "translatey(200px)"
        nelem.style.backgroundColor = "aliceblue"
        nelem.classList.remove('temp');
    }
    element.addEventListener('mouseover', handleMouseOver);
    element.addEventListener('mouseout',handleMouseOut)
    return () => {
      // console.log('unmount');
      element.removeEventListener('mouseover', handleMouseOver);
      element.removeEventListener('mouseout', handleMouseOut);

    };
  }
  // useEffect(hoverEff, []);



  //work in prog

async function setIntialLimit(e){
    let limi = document.getElementById("limi");
    // console.log(limi.value);
   if(limi.value===""){
    alert("provide correct format")
   }else{
     
     let numstr = parseInt(limi.value,10)
     let servres = await fetch('http://127.0.0.1:80/use/initial',{
       method:"post",
       headers:{
         "content-type":"application/json",
         "auth-token":token
       },
       body:JSON.stringify({
         init:numstr
       })
     })
     let ry =await servres.json();
    //  alert(ry.stmt);
    setustate({limit:numstr})
     e.target.parentNode.style.transform = "translatex(500px)"
     overlay.current.style.display = "none";
   }
}

function checkNew(x){//to be clled in getdata fn
  // console.log(x,"working");
if(x===false){
  overlay.current.style.display = "none";
}else{
  overlay.current.style.display = "flex";
}
}

var libtn = useRef(null)
var burn = useRef(null)
var neck = useRef(null)
let csmoke = useRef(null)
var overlay = useRef(null)
 
useEffect(()=>{getdata()},[]);
useEffect(()=>{checkLimit()},[ustate.limit])
useEffect(hoverEff, []); 
useEffect(checkNew,[])


  return (
    <>
    <NavLink to='/' ><button onClick={logout}>Log out</button></NavLink>
    <div className="overlay" ref={overlay}>
      <div className="cards">
       
      <div className="qna">
      <p>What's your estimated smoking habit?</p>
        <input type="number" name="" id="limi" placeholder='Count..'/>
        <button onClick={setIntialLimit}>Next</button>
      </div>
      <div className="qna">
        Before we begin....
        <button onClick={(e)=>{
          
          e.target.parentNode.style.transform = "translatex(500px)"
        }}>Next</button>
      </div>
      <div className="qna">
        hello
        <button onClick={(e)=>{
          
          e.target.parentNode.style.transform = "translatex(500px)"
        }}>Next</button>
      </div>
      
    </div>
    </div>
    <div>Usetrack</div>
    
    <div className="limit">
    <h1>{ustate.limit}</h1>
    
    </div>
    <div className="cigcont">
      
      <div className="cig">
        <div className="cigbut"></div>
        <div className="cigbod"></div>
        <div className="cigneck" ref={neck}></div>
      </div>
      <div className="lighter" ref={burn}>
        <img className="light"src={lighter} alt="" />

      </div>
      <button onClick={light} className='libtn' ref={libtn}>Light</button>
      <div className="cigsmok">
        <img src={cigsmok} ref={csmoke} alt="" />
      </div>
    </div>
    <div className="suggest">
      <h2>{ustate.suggestion}</h2>
    </div>
    </>

  )
  }

export default Usetrack