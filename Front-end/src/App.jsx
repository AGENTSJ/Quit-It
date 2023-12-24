import React, { useEffect, useState } from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,RouterProvider
  
}from 'react-router-dom'


import { auth } from './context/context'
import { cred } from './context/context'
import { users } from './context/context'

import Nav from './comp/nav'
import Groups from './comp/group/group'
import Invites from './comp/invites'
import Login from './comp/login'
import Usetrack from './comp/usetrack/Usetrack.jsx'
const routerd = createBrowserRouter(
  createRoutesFromElements(

      <Route path='/' element={<Nav/>}>
          <Route index  element={<Usetrack />}></Route>
          <Route path='/usetrack' element={<Usetrack />}></Route>
          <Route path='/groups' element={<Groups />} />
          <Route path='/invite' element={<Invites />}></Route>
          
      </Route>
  )
)




const App = () => {


  let[token,settoken]=useState("")
  let[user ,setuser]=useState({
    name:null,
    email:null
  })
  let[log,setlog]=useState(false);
  let cookie = document.cookie.split(';');
  let checktoken = cookie.map((e)=>{
    if(e.startsWith('auth-token=')){
      return e.replace('auth-token=',"")
    }
  })
// async function verify(){

//   if(checktoken[0]!==""){
    
//     let res =await fetch('http://127.0.0.1:80/cred/verify',{
//     method:'get',
//     headers:{
//       "auth-token":checktoken
//     }
//   })
//   let data = await res.json();

//   if(data.valid===true){
//     settoken(checktoken);
//     setlog(true);

//   }else{
//     settoken("")
//   }
//   }else{
//     settoken("")
//   }
  
// }
// useEffect(()=>{verify()},[])
  

  if(log===false){

    return(
      <>
      <Login props={{settoken,setlog,setuser}}/>
      </>
    )
  }else{
    
    return (
      <>
        <users.Provider value={{user,setuser}}>
        <cred.Provider value={{settoken,setlog}}>
        <auth.Provider value={token}>

        <RouterProvider router={routerd}></RouterProvider>

        </auth.Provider>
        </cred.Provider>
        </users.Provider>
      </>
      
    )
  }
}

export default App