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
    const navigate =useNavigate()
    
    console.log(user)
    const submit=async()=>{
        const web3 =new Web3(window.ethereum)
        const networkId =await web3.eth.net.getId()
        const networkData=Application.networks[networkId]


        if(networkData){
           console.log(typeof name, typeof age)
            const getAccount=new web3.eth.Contract(Application.abi,networkData.address)
            await getAccount.methods.editPatientInfo(name,parseInt(age)).send({from:user})
            .on('transactionHash',async(hash)=>{
                const patientInfo=await getAccount.methods.getPatientInfo().call()
                console.log(hash)
                console.log(patientInfo)
            })

           
        }
    }
  return (
    <>
    <div>
        <h1>Name: {userData[0]}</h1>
        <input type="text" event={user[0]} onChange={(event)=>{
            event.preventDefault()
            setName(event.target.value)
        }} />
        <h2>Age: {user[1]}</h2>
        <input type="text" event={user[1]} onChange={(event)=>{
            event.preventDefault()
            setAge(event.target.value)
        }} />
        <button onClick={submit}>Submit</button>
    </div>
    </>
  )
}

export default EditUser