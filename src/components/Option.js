import React from 'react'
import { NavLink } from 'react-router-dom'



function Option() {
 

  return (
    <>
<div className="flex flex-row">
      <div class="h-screen m-0 w-2/3 flex flex-col text-right justify-center bg-white-500 text-primary shadow-2xl">
        <p className="text-7xl font-semibold font-mono mr-9 px-9 py-3">Electronic Health Record</p>
        <p className="text-xl font-mono mr-9 px-9 py-3">Anim consectetur non labore fugiat proident velit voluptate cillum ut. Cupidatat consequat qui sint dolor sit ea.</p>
      </div>
      <div className="h-screen m-0 w-1/3 flex flex-col items-left justify-center bg-primary pl-16">
        <div className="flex align-left pl-3">
          <div className="my-5 font-mono text-3xl shadow-xl bg-white p-6 rounded-md drop-shadow-xl cursor-pointer">
            <NavLink className="text-primary" to='/patient'>Patient</NavLink>
          </div>
        </div>
        <div className="flex align-left pl-3">
          <div className="my-5 font-mono text-3xl shadow-xl bg-white p-6 rounded-md drop-shadow-xl cursor-pointer">
            <NavLink className="text-primary"  to='/doctor'>Doctor</NavLink>
          </div>
        </div>
      </div>
    </div>
  
  
    
  
    </>
  )
}

export default Option