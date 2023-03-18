import React, { useEffect, useState }  from 'react'

function Login({children}) {
    const [loading,setLoading]=useState(false)
    const [isUser,setIsUser]=useState(false)
    useEffect(()=>{
        loadWeb3()
    },[])
    const loadWeb3=async()=>{
        console.log(window.ethereum)
        if (typeof window.ethereum !== 'undefined') {
            console.log('MetaMask is installed!');
            setLoading(false)
            setIsUser(true)
          }
    }

    if(loading){return(<>Loading</>)}
    if(!loading && !isUser){
        return(<>Install MetaMask!</>)
    }

  return (

    <div>
        {children}
        
    </div>
  )
}

export default Login