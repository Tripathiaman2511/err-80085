import React, { createContext,useEffect, useState }  from 'react'
import Web3 from 'web3'
export const DataContext=createContext();
function Login({children}) {

    const [loading,setLoading]=useState(false)
    const [isUser,setIsUser]=useState(false)
    const[user,setUser]=useState('')
    
    useEffect(()=>{
        loadWeb3()
    },[])
    const loadWeb3=async()=>{
      if(window.ethereum){
        const web3=new Web3(window.ethereum)
        const accounts=await web3.eth.getAccounts()
        console.log(accounts[0])
          setUser(accounts[0])
          setLoading(false)
          setIsUser(true)
        
        
        
      }else{
        console.log("Install Meta Mask")
      }

        // console.log(window.ethereum)
        // if (typeof window.ethereum !== 'undefined') {
        //     console.log('MetaMask is installed!');
        //     setLoading(false)
        //     setIsUser(true)
        //   }
    }


    if(loading){return(<>Loading</>)}
    if(!loading && !isUser){
        return(<>Install MetaMask!</>)
    }

  return (

    <div>
        <DataContext.Provider value={{user}}>
          {children}
        </DataContext.Provider>
        
        
    </div>
  )
}

export default Login