import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

import Web3 from 'web3'
import Application from '../abis/Account.json'

function Option() {
  
  const navigate=useNavigate()
 // const[account,SetAccount]=useState(null)
 
  const handlePatient=async ()=>{
    
   const web3 =new Web3(window.ethereum)
    const networkId =await web3.eth.net.getId()
    const networkData=Application.networks[networkId]
    if(networkData){
       
        const getAccount=new web3.eth.Contract(Application.abi,networkData.address)
       const patientInfo=await getAccount.methods.getPatientInfo().call()
     if(patientInfo){
      console.log(patientInfo)
      navigate('/patient',{state:{patientInfo}})
     }
      
      //  SetAccount(getAccount)
    }else{
       window.alert("Application contract not deployed to detected network")
    }
  
 
  }

  return (
    <>
  
    <button onClick={handlePatient}>Patient</button>
    <button onClick={()=>navigate('/doctor')}>Doctor</button>
        
    
  
    </>
  )
}

export default Option