import React,{useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { DataContext } from './Login'

function Option() {
   const {account}=useContext(DataContext)
  const navigate=useNavigate()

  return (
    <>
   {account?(<h1>{account}</h1>):('')}
    <button >Patient</button>
    <button onClick={()=>navigate('/doctor')}>Doctor</button>
        
    
  
    </>
  )
}

export default Option