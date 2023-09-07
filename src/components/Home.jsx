import React from 'react'
import {useNavigate} from 'react-router-dom';
// import $ from 'jquery';

const Home = () => {

  const navigate = useNavigate();

  const handlePlatform = (e) => {
    navigate('/platform', {state: {value: e.target.value}})
    // console.log(e.target.value);
  }

  return (
    <div>
      <div className='px-4 py-4 text-2xl font-semibold border border-b-gray-400 rounded-b shadow-lg'>
        <span>E Com Pulse</span>
      </div>
      <div className='m-5 w-fit'>
        <div className='group '>
          <span className='bg-blue-500 pl-6 pr-14 py-2 text-xl font-semibold text-left text-white rounded-full'>
            Platform
          </span>
          <ul className=' group-hover:block mt-5 bg-blue-500 px-10 py-2 text-xl font-semibold text-white rounded-[30px]'>
            <li onClick={handlePlatform} value={1} className='hover:underline underline-offset-2 hover:text-gray-200'>Amazon</li>
            <li onClick={handlePlatform} value={2} className='hover:underline underline-offset-2 hover:text-gray-200'>Flipkart</li>
            <li onClick={handlePlatform} value={3} className='hover:underline underline-offset-2 hover:text-gray-200'>Nykaa</li>
            {/* <li className='hover:underline underline-offset-2 hover:text-gray-200'>Flipkart</li>
            <li className='hover:underline underline-offset-2 hover:text-gray-200'>Nykaa</li> */}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Home