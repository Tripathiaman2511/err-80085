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
    const[doctors,setDoctors]=useState([])
    useEffect(()=>{
      getDoctors((newArr)=>{
        console.log(newArr)
        setDoctors(newArr)
      })

      getRecord((newArr)=>{
        console.log(newArr)
        setRecord(newArr)
      })
    },[])

    const getDoctors=async(clbk)=>{
      let newArray=[]
      const web3 =new Web3(window.ethereum)
      const networkId =await web3.eth.net.getId()
      const networkData=Application.networks[networkId]
      if(networkData){
         
          const getAccount=new web3.eth.Contract(Application.abi,networkData.address)
         const doctorInfo=await getAccount.methods.getDoctors().call()
         if(doctorInfo){
            console.log(doctorInfo[0][0])
          for(let i=0;i<doctorInfo[0].length;i++){
           var newObj={}
            
             newObj.name=doctorInfo[0][i]
             newObj.age=doctorInfo[1][i]
             newObj.desc=doctorInfo[2][i]
             newObj.hash=doctorInfo[3][i]
           newArray.push(newObj)
          }
          
         }
        clbk(newArray)
      }else{
         window.alert("Application contract not deployed to detected network")
      }
     
  
    }

    // Send Data User
    const sendData=async(value)=>{

      const web3 =new Web3(window.ethereum)
      const networkId =await web3.eth.net.getId()
      const networkData=Application.networks[networkId]
      if(networkData){
         console.log(doctors)
          const getAccount=new web3.eth.Contract(Application.abi,networkData.address)
         await getAccount.methods.sendRecord(doctors[0].hash,value.hash,value.desc).send({from:user})
         .on("transactionHash",(hash)=>{
          console.log(hash)
        })
        
        }
    }
    
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


  return (
    <>
    <div className="w-[62rem] p-2 ml-2 bg-slate-300">
      
          <div className="text-3xl font-bold text-center">Medical History</div>
      <div className='h-[20rem] bg-slate-500 overflow-y-auto m-2'>
        {record?(record.map((value)=>{
        return (
         
             <div className=" flex flex-row justify-between bg-white p-2 mx-[4rem] mt-[1rem]  " key={value.hash}>
              
            <h1 className="" >{value.fileName}</h1>
          <div className='w-[7rem] flex flex-row justify-between'>
          <NavLink  key={value.hash} target='_blank' to={'https://ipfs.io/ipfs/'+value.hash}>View</NavLink>
          <button onClick={(event)=>{
            event.stopPropagation()
            console.log(value)
                 sendData(value)}}> <SideBarIcon className="" icon={<AiOutlineShareAlt size="27"/>}/></button>
          </div>
          
        </div>
          
       )
      })):(<>No Data Found</>)}

      </div>
      <div className="w-fit mx-auto  flex flex-col">

        
        <input type="file" className='my-2'  onChange={handleChange} />
        <input type="text" className='w-[14rem] h-[4rem]  my-2' onChange={(event)=>{setDescription(event.target.value)}} />
        
        <button className='bg-blue-500  py-2 px-2 w-[14rem] mt-4 mr-4 text-white '  onClick={()=>getCId(upload)}>Upload</button>
      </div>
    </div>
    
    </>
  )
}

export default MedicalHistory