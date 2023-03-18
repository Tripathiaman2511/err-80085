import React from 'react'
import { useNavigate } from 'react-router-dom'

function Option() {
  const navigate=useNavigate()

  return (
    <>
    <button onClick={()=>navigate('/patient')} >Patient</button>
    <button onClick={()=>navigate('/doctor')}>Doctor</button>
    </>
  )
}

export default Option