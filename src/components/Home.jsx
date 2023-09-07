import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { IoIosArrowDown } from 'react-icons/io';
import $ from 'jquery';
import Platform from './Platform';

const Home = () => {

  const navigate = useNavigate();
  const [platform, setPlatform] = useState([]);
  const host = process.env.REACT_APP_SERVER_URL

  const handlePlatform = (e) => {
    navigate('/product_list', { state: { value: e.target.value } })
    // console.log(e.target.value);
  }

  const getPlatform = async () => {
    axios.get(`${host}/api/get_platform_list/`, {
      headers: {
        'Authorization': `JWT ${localStorage.getItem('token')}`
      }
    })
      .then((response) => {
        return response.data
      }).then(data => {
        setPlatform(data)
      }
      )
  }

  useEffect(() => {
    getPlatform();
    // eslint-disable-next-line
  }, [])

  const togglePlatformMenu = () => {
    $('.platform-menu').toggleClass('hidden')
  }


  return (
    <>
      <div className='px-4 py-4 text-2xl bg-white font-semibold border border-b-gray-400 rounded-b shadow-lg'>
        <span>E Com Pulse</span>
      </div>
      <div className='m-5'>
        <Platform/>
      </div>
      <div className='flex justify-center items-center'>
        <img src="/home_image.png" alt="" />
      </div>
    </>
  )
}

export default Home