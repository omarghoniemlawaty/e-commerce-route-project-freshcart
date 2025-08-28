import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from '../Components/Footer/Footer'

const Layout = () => {
  return (
    <div>
      <Header/>
      <Outlet></Outlet>
      <Footer/>
    </div>
  )
}

export default Layout
