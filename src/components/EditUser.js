import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Web3 from 'web3'
import Application from '../abis/Account.json'
function EditUser() {
    const location =useLocation()
    const [user,setUser]=useState(location.state)
    const[name,setName]=useState()
    const[age,setAge]=useState()    
    
    console.log(user)
    const submit=async()=>{
        const web3 =new Web3(window.ethereum)
        const networkId =await web3.eth.net.getId()
        const networkData=Application.networks[networkId]

        if(networkData){
           
            const getAccount=new web3.eth.Contract(Application.abi,networkData.address)
            getAccount.methods.editPatientInfo()
        }
    }
  return (
    <>
    <div>
        <h1>Name: {user[0]}</h1>
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