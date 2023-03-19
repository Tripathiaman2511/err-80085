import React,{useState,useContext,useEffect} from 'react'
import * as IPFS from 'ipfs-core'
import { Buffer } from 'buffer'
import { DataContext } from './Login'
import Web3 from 'web3'
import Application from '../abis/Account.json'
import { AiOutlineCloudDownload, AiOutlineShareAlt, AiOutlineCloudUpload } from "react-icons/ai";
import { NavLink } from 'react-router-dom'

const SideBarIcon = ({icon}) => (
  <div className="sideBar-icon">
    {icon}
  </div>
)
function MedicalHistory() {

  const {user}=useContext(DataContext)
  const [record,setRecord]=useState([])
    const [file,setFile]=useState()
    const[fileName,setFileName]=useState()
    const[description,setDescription]=useState('')

    useEffect(()=>{
      getRecord((newArr)=>{
        console.log(newArr)
        setRecord(newArr)
      })
    },[])

    const getRecord=async(clbk)=>{
      let newArray=[]
      const web3 =new Web3(window.ethereum)
       const networkId =await web3.eth.net.getId()
       const networkData=Application.networks[networkId]
       if(networkData){
        const getAccount=new web3.eth.Contract(Application.abi,networkData.address)
        const dataRecord=await getAccount.methods.getRecords().call({from:user})
        
        if(dataRecord){
          
         for(let i=0;i<dataRecord[0].length;i++){
          let newObj={}
          
            newObj.fileName=dataRecord[0][i]
            newObj.hash=dataRecord[1][i]
            newObj.desc=dataRecord[2][i]
          
          newArray.push(newObj)
         }
         
        }
       
        
     
        
      }
      clbk(newArray)
      
    }
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
      const ipfs = await IPFS.create({repo: 'ok' + Math.random()});
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
        getRecord((newArr)=>{
          console.log(newArr)
          setRecord(newArr)
        })
      })
    }
    }

    // Send Data User
    const sendData=async(value)=>{
      console.log("Need a doctor Side")
    }
  return (
    <>
    <div className="h-full min-h-screen w-2/3 bg-light-sec flex flex-col pr-2 pl-1">
     <div  className="inset-0 flex flex-col items-center justify-center w-full mt-4 px-4">
     <div className="flex flex-row  rounded-lg p-4 mx-4 w-full max-h-16 mt-4">
          <div className="font-bold text-xl w-auto ">Patient's past documents</div>
        </div>
     </div>
      <div>
      {record?(record.map((value)=>{
        return (
        <div className="flex flex-row justify-between bg-white rounded-lg p-4 shadow-md mx-4 w-full max-h-16 mt-4" key={value.hash}>
          <NavLink target='_blank' to={'https://ipfs.io/ipfs/'+value.hash}>
          <h1 className="font-bold text-lg w-auto " >{value.fileName}</h1>
          </NavLink>
          <button onClick={(value)=>sendData(value)}> <SideBarIcon className="" icon={<AiOutlineShareAlt size="27"/>}/></button>
        </div>)
      })):(<>No Data Found</>)}
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