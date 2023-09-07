import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { IoIosArrowDown } from 'react-icons/io';
import $ from 'jquery';

const Platform = () => {

    const navigate = useNavigate();
    const [platforms, setPlatforms] = useState([]);
    const host = process.env.REACT_APP_SERVER_URL

    const handlePlatform = (e) => {
        $('.platform-menu').toggleClass('hidden')
        console.log("Do something")
        navigate('/product_list', { state: { value: e.target.value } })
        // console.log(e.target.value);
    }

    const getPlatforms = async () => {
        console.log("Do Something")
        
        axios.get(`${host}/api/get_platform_list/`, {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                return response.data
            }).then(data => {
                setPlatforms(data)
            }
            )
    }

    useEffect(() => {
        getPlatforms();
        // eslint-disable-next-line
    }, [])

    const togglePlatformMenu = () => {
        $('.platform-menu').toggleClass('hidden')
    }

    const capitalFirstLetter = (word) => {
        if (typeof word !== 'string' || word.length === 0) {
            return word; // Return unchanged if the input is not a non-empty string
        }
        
        return word.charAt(0).toUpperCase() + word.slice(1);
    }


    return (
        <>
            <div className='group w-fit relative'>
                {/* {platform && <>
            <span className='bg-blue-500 pl-6 pr-14 py-2 text-xl font-semibold text-left text-white rounded-full'>
              Platform
            </span>
            <ul className=' group-hover:block mt-5 bg-blue-500 px-10 py-2 text-xl font-semibold text-white rounded-[30px]'>
              <li onClick={handlePlatform} value={platform.id} className='hover:underline underline-offset-2 hover:text-gray-200'>{platform.platform_name}</li>
              <li onClick={handlePlatform} value={platform.id} className='hover:underline underline-offset-2 hover:text-gray-200'>{platform.platform_name}</li>
              <li onClick={handlePlatform} value={platform.id} className='hover:underline underline-offset-2 hover:text-gray-200'>{platform.platform_name}</li>
            </ul>
            </>   */}
                <div className='flex px-6 space-x-9 bg-gray-100 transition-colors py-2 justify-between items-center border border-gray-300 text-xl font-semibold text-left rounded-lg hover:bg-gray-50 active:bg-gray-100' onClick={togglePlatformMenu}>
                    <span>
                        Platform
                    </span>
                    <IoIosArrowDown />
                </div>
                {
                    platforms.length > 0 &&
                    <ul className='platform-menu hidden py-2 bg-white text-lg  text-black border  shadow-lg rounded-lg mt-2 transition-all absolute w-full'>
                        {
                            platforms.map(platform => {
                                return (
                                    <li onClick={handlePlatform} key={platform.id} value={platform.id} className='px-6 py-2 border-gray-400 w-full hover:bg-gray-100 transition-all duration-500'>{capitalFirstLetter(platform.platform_name)}</li>
                                )
                            })
                        }
                    </ul>
                }

            </div>
        </>
    )
}

export default Platform