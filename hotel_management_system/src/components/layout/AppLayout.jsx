import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#121212]">
      {/* Navigation Bar */}
      <Header />

      {/* Main Content Area - Jahan sare UI pages load honge */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  )
}

export default AppLayout