import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

function Patient() {

  return (
    <>
    <h1>Patient</h1>
    <div>
        <h1>name: Patient name</h1>
      
    </div>
    <div>
        <h1>Age: Patient Age</h1>
        
    </div>
    <div>
        <h1>Records: Patient's Medical History</h1>
        
    </div>
    <div>
        <NavLink to='/patient/mhistory'>Medical History</NavLink>
        <NavLink to='/patient/diagnosis'>Diagnosis</NavLink>
    </div>
    <Outlet/>
    </>
  )
}

export default Patient