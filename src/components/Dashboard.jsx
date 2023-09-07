import React, { useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router-dom';
import NavBar from './NavBar'

const Dashboard = () => {

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      //Do nothing;
    }
    else {
      navigate("/login");

    }
  }, [navigate])

  return (
    <div className='md:flex'>
      <div className='lg:w-96 sticky top-0 md:h-screen'>
        <NavBar />
      </div>
      <div className='md:w-full'>
        <Outlet/>
     </div>
    </div>
  )
}

export default Dashboard