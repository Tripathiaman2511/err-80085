import React, { useState,useEffect, useContext} from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import Web3 from 'web3'
import Application from '../abis/Account.json'
import { DataContext } from './Login'
import { useNavigate } from 'react-router-dom'
function Patient() {
  const navigate=useNavigate()
  const {user}=useContext(DataContext)
  const[patientInfo,setPatientInfo]=useState()
  const [loading,setLoading]=useState(true)
   useEffect(() => {
    handlePatient(()=>{
      setLoading(false)
    })
  
  }, [])
  
  const handlePatient=async (clbk)=>{
    
    const web3 =new Web3(window.ethereum)
     const networkId =await web3.eth.net.getId()
     const networkData=Application.networks[networkId]
     if(networkData){
        
         const getAccount=new web3.eth.Contract(Application.abi,networkData.address)
        const patientInfo=await getAccount.methods.getPatientInfo().call({from:user})
      if(patientInfo){
        setPatientInfo(patientInfo)
       console.log(patientInfo)
       
      
      }
       
       //  SetAccount(getAccount)
     }else{
        window.alert("Application contract not deployed to detected network")
     }
     clbk()
   
  
   }
   if(loading){
    return(<>Loading...</>)
   }
  
 
  return (
    <>
    <div>
      <div>
      <h1>Name: {patientInfo[0]?patientInfo[0]:'Set Name'}</h1>
      <h1>Age: {parseInt(patientInfo[1])!==0?patientInfo[1]:'Set Age'}</h1>
      <h1>Name: {patientInfo[2].length!==0?patientInfo[2]:'Set DataAddress'}</h1>
      </div>
      <button onClick={()=>{
        navigate('/edit',{state:patientInfo})
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