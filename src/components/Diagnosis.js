import React, { useState } from 'react'

function Diagnosis() {
    const [file,setFile]=useState()
    const handleChange=(event)=>{
            setFile(event.target.files[0])
    }
    const show=()=>{
        console.log(file)
    }
  return (
   <>
   <div>
   <h1>Diagnosis History</h1>
    <div>
        {/* Add map function to read all files  */}
    <h3>Record Name</h3>
    <button>Share</button>
    </div>
   </div>
   <div>
    <h1>Upload File</h1>
    <input type="file"  onChange={handleChange} />
    <button onClick={show}>Upload</button>
   </div>
   </>
  )
}

export default Diagnosis