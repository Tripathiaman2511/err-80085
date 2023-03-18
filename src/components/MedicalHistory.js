import React,{useState,useContext} from 'react'
import * as IPFS from 'ipfs-core'
import { Buffer } from 'buffer'
import { DataContext } from './Login'
import Web3 from 'web3'
import Application from '../abis/Account.json'
function MedicalHistory() {
  const {user}=useContext(DataContext)
    const [file,setFile]=useState()
    const[fileName,setFileName]=useState()
    const[description,setDescription]=useState('')
    const fileToBuffer = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const buffer = Buffer.from(event.target.result);
          resolve(buffer);
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.readAsArrayBuffer(file);
      });
    };
    const handleChange=async (event)=>{
            
     
      setFileName(event.target.files[0].name)
      const buffer = await fileToBuffer(event.target.files[0]);
      setFile(buffer)

    }
    const getCId=async(clbk)=>{
      const ipfs = await IPFS.create();
      const { cid } = await ipfs.add(file);
      const ipfsUrl = `https://ipfs.io/ipfs/${cid}`;
      const arrayFile=ipfsUrl.split('/')
      const hashCode=arrayFile.pop()
     clbk(hashCode)
    }
    const upload=async(code)=>{
      const web3 =new Web3(window.ethereum)
     const networkId =await web3.eth.net.getId()
     const networkData=Application.networks[networkId]
     if(networkData){
      const getAccount=new web3.eth.Contract(Application.abi,networkData.address)
      await getAccount.methods.addRecord(fileName,code,description).send({from:user})
      .on("transactionHash",(hash)=>{
        console.log(hash)
      })
    }
    }
  return (
    <>
    <div>
    <h1>Medical History</h1>
    <div>
        {/* Add map function to read all files  */}
    <h3>Record Name</h3>
    <button>Share</button>
    </div>
    </div>
    <div>
    <h1>Upload File</h1>
    <input type="file"  onChange={handleChange} />
    <input type="text" onChange={(event)=>{
      setDescription(event.target.value)
    }} />
    <button onClick={()=>getCId(upload)}>Upload</button>
   </div>
    </>
  )
}

export default MedicalHistory