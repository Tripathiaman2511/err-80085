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
    <div className='flex flex-row m-2 w-full'>
    <div className="w-[32rem]">
         <div className=" bg-slate-900 text-white text-lg py-4 px-2">
            <p className="">Name: {patientInfo[0]?patientInfo[0]:'Undefined'}  </p>
            <p className="">Address: {user} </p>
            <p className="">Age: {parseInt(patientInfo[1])!==0?patientInfo[1]:'Undefined'} </p>
            <p className="">Number of Record: {patientInfo[3].length!==0?patientInfo[3].length:'0'}</p>
            <div className='flex flex-row justify-end'>
             <button className='bg-blue-500  py-2 px-4 mt-4 mr-4 ' onClick={()=>{ navigate('/edit',{state:{patientInfo,type:'Patient'}}) }}>Edit Data  </button> 
            </div>
          </div>
       
        <div className='w-full mt-[1rem] text-white bg-slate-900 py-[7rem] text-xl flex flex-col '>
        <NavLink className="w-[12rem] text-center mx-auto p-4 bg-slate-500 hover:bg-blue-500" to='/patient/mhistory'>Medical History</NavLink>
        <NavLink className="w-[12rem] text-center mt-4 mx-auto p-4 bg-slate-500 hover:bg-blue-500" to='/patient/diagnosis'>Diagnosis</NavLink>

        </div>
      
    </div>
    <Outlet/>
</div>
    
    </>
  )
}

export default Patient