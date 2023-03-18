import React, { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
function Patient() {
  const location =useLocation()
  const[patient,setPatient]=useState(location.state.patientInfo)
  const navigate=useNavigate()
 
  return (
    <>
    <div>
      <div>
      <h1>Name: {patient[0]?patient[0]:'Set Name'}</h1>
      <h1>Age: {parseInt(patient[1])!==0?patient[1]:'Set Age'}</h1>
      <h1>Name: {patient[2].length!==0?patient[2]:'Set DataAddress'}</h1>
      </div>
      <button onClick={()=>{
        navigate('/edit',{state:patient})
      }}>Edit Data 
        </button>      
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