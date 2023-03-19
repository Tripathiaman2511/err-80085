import React, { useState,useEffect, useContext} from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import Web3 from 'web3'
import Application from '../abis/Account.json'
import { DataContext } from './Login'
import { useNavigate } from 'react-router-dom'

function Doctor() {
  const navigate=useNavigate()
  const {user}=useContext(DataContext)
  const[doctorInfo,setDoctorInfo]=useState()
  const [loading,setLoading]=useState(true)
   useEffect(() => {
   

    handleDoctor(()=>{
      setLoading(false)
    })
  
  }, [])

  
  const handleDoctor=async (clbk)=>{
    
    const web3 =new Web3(window.ethereum)
     const networkId =await web3.eth.net.getId()
     const networkData=Application.networks[networkId]
     if(networkData){
        
         const getAccount=new web3.eth.Contract(Application.abi,networkData.address)
        const doctorInfo=await getAccount.methods.getDoctorInfo().call({from:user})
      if(doctorInfo){
      setDoctorInfo(doctorInfo)
       console.log(doctorInfo)
       
      
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
      <h1>Name: {doctorInfo[0]?doctorInfo[0]:'Set Name'}</h1>
      <h1>Age: {parseInt(doctorInfo[1])!==0?doctorInfo[1]:'Set Age'}</h1>
      {/* <h1>Number of Record: {doctorInfo[3].length!==0?doctorInfo[3].length:'Set DataAddress'}</h1> */}
      </div>
      <button onClick={()=>{
        navigate('/edit',{state:doctorInfo})
      }}>Edit Data 
        </button>      
    </div>
    <div>
        {/* <NavLink to='/patient/mhistory'>Medical History</NavLink>
        <NavLink to='/patient/diagnosis'>Diagnosis</NavLink> */}
    </div>
    <Outlet/>
    </>
  )
}

export default Doctor