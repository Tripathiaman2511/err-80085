import React,{useContext} from 'react'
import { DataContext } from './Login'

function Navbar() {
    const {user}=useContext(DataContext)
    return (
    <>
    <div>
        <h1>Electronic Health Record</h1>
        <h1>{user}</h1>
    </div>
    </>
  )
}

export default Navbar