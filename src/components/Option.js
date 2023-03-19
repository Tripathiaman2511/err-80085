import React from 'react'
import { NavLink } from 'react-router-dom'



function Option() {
 

  return (
    <>
<div className="m-4 flex flex-row">
      <div class="w-1/2 mt-[15rem] ">
        <p className="w-fit text-4xl text-black font-bold mx-auto">ELECTRONIC HEALTH RECORD</p>
        <p className="w-[40rem] text-lg text-slate-500 mx-auto text-center">Health Record Management System powered by web3 technology.</p>
      </div>
      <div className="w-1/2 mt-[6rem]">
        <div className='w-fit flex flex-col mx-auto '>
        <NavLink className="text-primary w-[40rem] py-[5rem] bg-slate-400 hover:bg-black hover:text-white  "  to='/patient'>
          <h1 className='text-center text-4xl '>Patient</h1>

          </NavLink>
        <NavLink className="text-primary w-[40rem] py-[5rem] bg-slate-400 mt-[2rem]  hover:bg-black hover:text-white  " to='/doctor'>
        <h1 className='text-center text-4xl '>Doctor</h1>
        </NavLink>
      
        </div>
      </div>
    </div>
  
  
    
  
    </>
  )
}

export default Option