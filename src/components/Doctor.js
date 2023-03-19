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

  //get requested file
  const getRequestedData=async()=>{
    const web3 =new Web3(window.ethereum)
    const networkId =await web3.eth.net.getId()
    const networkData=Application.networks[networkId]
    if(networkData){
       
        const getAccount=new web3.eth.Contract(Application.abi,networkData.address)
       const reqData=await getAccount.methods.getDoctorsRequestedData().call({from:user})
     if(reqData){
      console.log(reqData)
     
    }
  }

  }
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
    <div  className='flex flex-row m-2 w-max'>
      <div className="w-[32rem]" >
        <div className=" bg-slate-900 text-white text-lg py-4 px-2" >
          <h1 className='font-semibold '>Name: <span className='text-slate-300 font-normal ml-2'> {doctorInfo[0]?doctorInfo[0]:'Undefined'}</span></h1>
          <h1 className='font-semibold '>Age:<span className='text-slate-300 font-normal ml-2'>  {parseInt(doctorInfo[1])!==0?doctorInfo[1]:'0'}</span></h1>
          <h1 className='font-semibold '>Description: <span className='text-slate-300 font-normal ml-2'>  {doctorInfo[2]!==''?doctorInfo[2]:'UnDefined'}</span></h1>
          <div className='flex flex-row justify-end'>
             <button className='bg-blue-500  py-2 px-4 mt-4 mr-4 ' onClick={()=>{ navigate('/edit',{state:{doctorInfo,type:'Doctor'}}) }}>Edit Data  </button> 
            </div>
  
        </div>
        <div className='w-full mt-[1rem] text-white bg-slate-900 py-[7rem] text-xl flex flex-col '>
       <button className='w-[12rem] text-center mx-auto p-4 bg-slate-500 hover:bg-blue-500' onClick={getRequestedData}>GetData</button>
       </div>
  

      </div>
      <div>
       
      </div>
    </div>
   
    </>
  )
}

export default Doctor