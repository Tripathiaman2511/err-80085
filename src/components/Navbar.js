import React,{useContext} from 'react'
import { DataContext } from './Login'

function Navbar() {
    const {user}=useContext(DataContext)
    return (
    <>
    <div className='sticky top-0 flex flex-row p-2 py-4 bg-slate-900 justify-between text-white text-xl'>
        <h1>EHR</h1>
        <h1 className='text-slate-400'>{user}</h1>
    </div>
    </>
  )
}

export default Navbar