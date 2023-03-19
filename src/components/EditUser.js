import React, { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Web3 from 'web3'
import Application from '../abis/Account.json'
import { DataContext } from './Login'
function EditUser() {
    const {user}=useContext(DataContext)
    const location =useLocation()
    const [userData,setUserData]=useState(location.state)
    
    const[name,setName]=useState()
    const[age,setAge]=useState()  
    const[desc,setDesc]=useState()  
    const navigate =useNavigate()
    
    console.log(user)
    const submit=async()=>{
        const web3 =new Web3(window.ethereum)
        const networkId = await web3.eth.net.getId()
        const networkData=Application.networks[networkId]


        if(networkData){
           console.log(networkData)
            const getAccount=new web3.eth.Contract(Application.abi,networkData.address)
            if(userData.type==='Doctor'){
                await getAccount.methods.editDoctorInfo(name,parseInt(age),desc).send({from:user})               
            .on('transactionHash',async(hash)=>{
                console.log(hash)
                navigate(-1)
            })    
            }
            else{
                await getAccount.methods.editPatientInfo(name,parseInt(age)).send({from:user})           
            .on('transactionHash',async(hash)=>{
                console.log(hash)
                navigate(-1)
            })
            }


           
        }
    }
  return (
    <>
    <div className='m-2 bg-slate-300 w-[32rem] mx-auto mt-[12rem] text-xl  flex flex-col '>
        
       
        {
            userData.type==='Doctor'?(

                <>
                <div className='w-fit mx-auto'>
                <h1 className='w-fit mx-auto'>Name: {userData.doctorInfo[0]}</h1>
        <input type="text" placeholder='Add name' className='p-2 border border-solid border-black' event={user[0]} onChange={(event)=>{
            event.preventDefault()
            setName(event.target.value)
        }} />
                </div>
                <div className='w-fit mx-auto'>
                <h2 className='w-fit mx-auto'>Age: {parseInt(userData.doctorInfo[1])}</h2>
        <input type="text" placeholder='Add Age' className='p-2 border border-solid border-black' event={user[1]} onChange={(event)=>{
            event.preventDefault()
            setAge(event.target.value)
        }} />
                </div>
                <div className='w-fit mx-auto' >
                <h2 className='w-fit mx-auto'>Desc: {userData.doctorInfo[2]}</h2>
        <input type="text" placeholder='Add Description' className='p-2 border border-solid border-black' event={user[1]} onChange={(event)=>{
            event.preventDefault()
            setDesc(event.target.value)
        }} />

                </div>
           
                </>
            ):(
                <>
                 <div className='w-fit mx-auto'>
                <h1 className='w-fit mx-auto'>Name: {userData.patientInfo[0]}</h1>
        <input type="text" placeholder='Add name' className='p-2 border border-solid border-black' event={user[0]} onChange={(event)=>{
            event.preventDefault()
            setName(event.target.value)
        }} />
                </div>
                <div className='w-fit mx-auto'>
                <h2 className='w-fit mx-auto'>Age: {parseInt(userData.patientInfo[1])}</h2>
        <input type="text"  placeholder='Add Age' className='p-2 border border-solid border-black' event={user[1]} onChange={(event)=>{
            event.preventDefault()
            setAge(event.target.value)
        }} />
                </div>
                </>
            )
        }

        <button className='w-[16rem] text-white mb-2 mx-auto bg-blue-500  py-2 px-4 mt-4 ' onClick={submit}>Submit</button>
    </div>
    </>
  )
}

export default EditUser