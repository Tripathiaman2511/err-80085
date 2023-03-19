import React, { useState,useEffect, useContext} from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import Web3 from 'web3'
import Application from '../abis/Account.json'
import { DataContext } from './Login'
import { useNavigate } from 'react-router-dom'
import { TbReportMedical, TbReport} from "react-icons/tb";
import { RiStethoscopeLine } from "react-icons/ri"
const SideBarIcon = ({icon}) => (
  <div className="sideBar-icon">
    {icon}
  </div>
)
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

  //Get Doctors


  //get Patients Details
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
    <div className='flex flex-row '>
    <div className=" h-screen sw-1/3 bg-primary flex flex-col pl-2 pr-1">
          <div className="inset-0 flex items-center justify-center w-full mt-4">
            <SideBarIcon icon={<TbReport className="mr-2 stroke-white " size="50"/>}/>
          <div className="text-white font-sans text-6xl my-7">EHR</div>
        </div>
        <div className="inset-0 flex items-center justify-center w-full mt-4">
          <div className="bg-white rounded-lg p-4 shadow-xl mx-4 w-full">
            <div className="font-bold text-lg mb-2">Patient Details</div>
            <p className="text-gray-700 text-base">Name: {patientInfo[0]?patientInfo[0]:'Set Name'}  </p>
            <p className="text-gray-700 text-base">Address: {user} </p>
            <p className="text-gray-700 text-base">Age: {parseInt(patientInfo[1])!==0?patientInfo[1]:'Set Age'} </p>
            <p className="text-gray-700 text-base">Number of Record: {patientInfo[3].length!==0?patientInfo[3].length:'Set DataAddress'}</p>
          </div>
        </div>
        <div className="inset-0 flex flex-col items-start justify-center w-full">
        <div className="bg-white rounded-lg p-4 mt-4 shadow-md mx-4 w-fit font-bold text-center cursor-pointer">
      <button onClick={()=>{
        navigate('/edit',{state:{patientInfo,type:'Patient'}})
      }}>Edit Data  </button> 
        </div> 
        <div className="bg-white rounded-lg p-4 mt-4 shadow-md mx-4 w-fit font-bold text-center cursor-pointer">
        <NavLink className="flex items-center justify-start" to='/patient/mhistory'>
        <SideBarIcon icon={<TbReportMedical className="mr-2" size="22"/>}/>
        Medical History
        
        </NavLink>
        
          </div>
          <div className="bg-white rounded-lg p-4 mt-4 shadow-md mx-4 w-fit font-bold text-center cursor-pointer">
          <NavLink className="flex items-center justify-start" to='/patient/diagnosis'>
          <SideBarIcon icon={<RiStethoscopeLine className="mr-2" size="22"/>}/>
            Diagnosis</NavLink>

          </div>    
        </div>
  </div>
  <Outlet/>
</div>
    
    </>
  )
}

export default Patient