import React, { useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router-dom';
import NavBar from './NavBar'
import axios from 'axios';

const Dashboard = () => {

  const navigate = useNavigate();
  const host = process.env.REACT_APP_SERVER_URL

  useEffect(() => {
    if (localStorage.getItem('token')) {
      //Do nothing;
      axios.get(`${host}/api/check_access_token/`, {
        headers: {
          'Authorization': `JWT ${localStorage.getItem('token')}`
        }
      })
        .then((response) => {
          // console.log(response.data)
          return response.data
        }).then(data => {
          if (data.access && data.refresh){
            localStorage.setItem('token', data.access)
            localStorage.setItem('refresh', data.refresh)
          }
          else{
            // navigate('/login');
          }
        }
        )
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
      <div className='md:w-full bg-mystic-100 sm:h-auto'>
        <Outlet/>
     </div>
    </div>
  )
}

export default Dashboard