import './App.css';
import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import IssueWrapper from './components/IssueWrapper';
import NavBar from './components/NavBar';
import Charts from './components/Charts'
import Logo from './assets/BugRangerLogo.svg';
import About from './components/About';



/*TODO: auth, prioritize, search as component, date updated, navbar responsiveness, date(and priority) sorting, pagination,about
*/


function App() {

  const[issues,setIssues] = useState(()=>{
        const tempJson = localStorage.getItem("ISSUES")
        if(tempJson==null) return []

        return JSON.parse(tempJson)
    })
    
    useEffect(()=>{
        localStorage.setItem("ISSUES", JSON.stringify(issues))
    },[issues])

  return (
    <>
    <div className='header-logo'>
      <img src={Logo} alt="" className='logo'></img>
    </div>
    <NavBar/>
        <Routes>
          <Route path="/" element={<IssueWrapper issues={issues} setIssues={setIssues} />}/>
          <Route path="/charts" element={<Charts issues={issues}/>}/>
          <Route path="/about" element={<About/>}/>
        </Routes>
    </>
  );
}

export default App;
