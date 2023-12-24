import React, { useRef, useState } from 'react'
import '../style/cred.css'
const Login = (params) => {

    // let [fn,setfn]=useState('Sign Up');
    let emailref = useRef(null)
    let nameref = useRef(null)
    let passref = useRef(null)

    async function action(fn){
        
            if(emailref.current.value===""||nameref.current.value===""||passref.current.value===""){
                alert('provide correct formats')
            }else{
                
                if(fn===0){
                    // alert("signing ")
                let res = await fetch('http://127.0.0.1:80/cred/createuser',{
                 method:'post',
                 headers:{
                     "content-type":"application/json"
                 },
                 body:JSON.stringify({
                     "name":nameref.current.value,
                     "email":emailref.current.value,
                     "groups":[],
                     "password":passref.current.value,
                     "ontrack":0
                 })
                })
                let data = await res.json();
                alert(data.stmt)
            }else if(fn===1) {
                
                // console.log(emailref.current.value);
                let res = await fetch('http://127.0.0.1:80/cred/login',{
                 method:'post',
                 headers:{
                     "content-type":"application/json"
                 },
                 body:JSON.stringify({
                     "name":nameref.current.value,
                     "email":emailref.current.value,
                     "password":passref.current.value
                 })
                })
                let data = await res.json();
                if(data.valid===true){
                    document.cookie=`auth-token=${data.authtoken};temptest=trtdoseofnull`
                    params.props.settoken(data.authtoken)
                    params.props.setlog(true)
                    params.props.setuser({
                        name:nameref.current.value,
                        email:emailref.current.value
                    })
                    
                }else{
                    alert('login failed')
                }
            }
        }
        
    }
  return (
    <>
        
    
        <div className="credcont">
        <h1>Quit It</h1>
            <h2>Email</h2><br />
            <input type="email" ref={emailref} />
            <h2>Name</h2><br />
            <input type="text" ref={nameref}/>
            <h2>Password</h2><br />
            <input type="password" ref={passref} />
            <br />
        <div className='logswich'>
            <button onClick={()=>{action(1)}}>Login</button>
            <button onClick={()=>{action(0)}}>Sign Up </button>
        </div>
        </div>
    {/* <div className="temp">
        ab1
        <br />
        name:    abhijithsj2   <br />
        email:  abhijithsj@abijth.com    <br />
        pass:     youremakingthisdifficult   <br />
<br />
<br />
        ab2
        <br />
        name:abhijithsj
        email:abhijithsj@abij.com
        pass:youremakingthisdifficult
<br />
<br />
        ab3

        name:
        email:
        pass:
        <br />
        <br />
        ab4
        <br />
        name:abhijithsj4<br />
        email:abherty@abhi.com<br />
        pass:yousurethiisgood<br /> 
     </div> */}
    </>
  )
}

export default Login