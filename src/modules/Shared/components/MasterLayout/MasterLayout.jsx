import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Navbar from '../Navbar/Navbar'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'

export default function MasterLayout({loginData}) {
  console.log(loginData);
  
  return (
    <>
    <div className="d-flex">
      <div className="">
        <Sidebar/>
      </div>
      <div className='w-100'>
      <Navbar loginData={loginData}/>
      
        <Outlet/>
      </div>

    </div>
    </>
  )
}
