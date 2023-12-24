import React from 'react'
import { NavLink,Outlet } from 'react-router-dom'
import '../style/nav.css'

const Nav = () => {
  return (
    <>
    <div className="nav">
        <NavLink to='usetrack' >Tracker</NavLink>
        <NavLink to='invite'>Invites</NavLink>
        <NavLink to='groups'>Groups</NavLink>
    
    </div>
    <Outlet />
    </>
  )
}

export default Nav