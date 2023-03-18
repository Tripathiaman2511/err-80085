
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';

import Option from './components/Option';
import Patient from './components/Patient';

import MedicalHistory from './components/MedicalHistory';
import Diagnosis from './components/Diagnosis';

function App() {
  return (
    <>
    
           <Login>
           
           <Routes>
             <Route path='/' element={<Option/>}/>
             <Route path='/patient' element={<Patient/>}>
             <Route path='mhistory' element={<MedicalHistory/>}/>
             <Route path='diagnosis' element={<Diagnosis/>}/>
             </Route>  
           </Routes>
           
              </Login>


   
    
    </>
    
  );
}

export default App;
