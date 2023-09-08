import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import $ from 'jquery';
import axios from 'axios';
import {SlLogout} from 'react-icons/sl'
import { FiHome } from 'react-icons/fi'
import { TbBrandProducthunt } from 'react-icons/tb'
import { VscSymbolKeyword } from 'react-icons/vsc'

const NavBar = () => {

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const host = process.env.REACT_APP_SERVER_URL;

    const toggleMenu = () => {

        $(".menu").toggleClass("-translate-x-full")
        var hamburger = $(".hamburger").children()
        // console.log(hamburger)
        hamburger[0].classList.toggle("absolute")
        hamburger[0].classList.toggle("rotate-45")
        hamburger[1].classList.toggle("hidden")
        hamburger[2].classList.toggle("-rotate-45")
    }

    const toggleSideMenu = () => {
        let width = $('.bg-sidebar');
        if (width.width() !== 0) {
            $('.lg:w-96').width = 0;
        }
        else {

        }
    }

    const getUser = async () => {
        axios.get(`${host}/api/get_user_details/`, {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                return response.data
            }).then(data => {
                setName(data.full_name)
            }
            )
    }
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login')
    }

    useEffect(() => {
        if(localStorage.getItem('token')){
            getUser();
        }
        // eslint-disable-next-line
    }, [])

    // const toggleMenuHide = () => {
    //     $(".menu").toggleClass("-translate-x-full");
    // }


    return (
        <>
            <div className='bg-blue-zodiac-950 bg-center hidden md:flex text-white h-screen md:w-80 lg:w-[22rem] relative flex-col items-center pt-16 space-y-10 shadow-navbar'>
                <button className="absolute top-0 right-0 p-4 hamburger-side inline-block cursor-pointer h-10" onClick={toggleSideMenu}>
                    <div className="line h-0.5 w-5 my-1 bg-white"></div>
                    <div className="line h-0.5 w-5 my-1 bg-white"></div>
                    <div className="line h-0.5 w-5 my-1 bg-white"></div>
                </button>
                <div>
                    <Link to='/'>
                        <img src="/logo.png" alt="" className='w-32' />
                    </Link>
                </div>
                <div className='h-7'>
                    <span className='font-bold text-xl text-gray-200 cursor-default'>{name}</span>
                </div>
                <ul className='menu flex flex-col items-center space-y-14 w-full px-8'>
                    <li className='font-bold w-full rounded-lg hover:cursor-pointer hover:bg-blue-zodiac-900 hover:underline hover:underline-offset-8 transition-all'>
                        <Link to='/' className='flex px-2 py-2 space-x-3 items-center'>
                            <FiHome className='text-2xl' />
                            <span className='text-xl'>Home</span>
                        </Link>
                    </li>
                    <li className='font-bold w-full rounded-lg hover:cursor-pointer hover:bg-blue-zodiac-900 hover:underline hover:underline-offset-8 transition-all'>
                        <Link to='/keyword_suggestion' className='flex px-2 py-2 space-x-3 items-center' state={{changed: false}}>
                            {/* <img src="/keyword_suggestion.svg" alt="" className='w-6' /> */}
                            <VscSymbolKeyword className='text-2xl' />
                            <span className='text-xl'>Keyword Suggestions</span>
                        </Link>
                    </li>
                    <li className='font-bold w-full rounded-lg hover:cursor-pointer hover:bg-blue-zodiac-900 hover:underline hover:underline-offset-8 transition-all'>
                        <Link to='/product_performance' className='flex px-2 py-2 space-x-3 items-center' state={{ product_id: null, platform_id: null, changed: true }}>
                            {/* <img src="/product_performance.svg" alt="" className='w-6' /> */}
                            <TbBrandProducthunt className='text-3xl' />
                            <span className='text-xl'>Product Performance</span>
                        </Link>
                    </li>
                    {/* <li className='bg-blue-500 font-bold w-full rounded-lg hover:cursor-pointer hover:bg-blue-700 hover:underline hover:underline-offset-8 transition-all'>
                        <Link to='/' className='flex px-2 py-2 space-x-3 items-center'>
                            <FiHome className='text-2xl' />
                            <span className='text-xl'>Home</span>
                        </Link>
                    </li>
                    <li className='bg-blue-500 font-bold w-full rounded-lg hover:cursor-pointer hover:bg-blue-700 hover:underline hover:underline-offset-8 transition-all'>
                        <Link to='/' className='flex px-2 py-2 space-x-3 items-center'>
                            <VscSymbolKeyword className='text-2xl' />
                            <span className='text-xl'>Keyword Suggestions</span>
                        </Link>
                    </li>
                    <li className='bg-blue-500 font-bold w-full rounded-lg hover:cursor-pointer hover:bg-blue-700 hover:underline hover:underline-offset-8 transition-all'>
                        <Link to='/product_performance' className='flex px-2 py-2 space-x-3 items-center'>
                            <TbBrandProducthunt className='text-3xl' />
                            <span className='text-xl'>Product Performance</span>
                        </Link>
                    </li> */}
                            {/* <img src="/product_performance.svg" alt="" className='w-6' /> */}
                            {/* <img src="/keyword_suggestion.svg" alt="" className='w-6' /> */}
                    {/* <li className='bg-blue-500 font-bold px-2 py-2 space-x-3 w-full flex rounded-lg hover:cursor-pointer hover:bg-blue-700 hover:underline hover:underline-offset-8 transition-all'>
                        <img src="/keyword_suggestion.svg" alt="" className='w-6' />
                        <span className='text-xl'>Keyword Suggestions</span>
                    </li>
                    <li className='bg-blue-500 font-bold px-2 py-2 space-x-3 w-full flex rounded-lg hover:cursor-pointer hover:bg-blue-700 hover:underline hover:underline-offset-8 transition-all'>
                        <img src="/product_performance.svg" alt="" className='w-6' />
                        <span className='text-xl'>Product Performance</span>
                    </li> */}
                    {/* <li className='bg-blue-500 font-bold text-lg px-4 py-2 w-full text-center rounded-lg hover:cursor-pointer hover:bg-blue-700 hover:underline hover:underline-offset-8 transition-all'>Keyword Suggestions</li>
                <li className='bg-blue-500 font-bold text-lg px-4 py-2 w-full text-center rounded-lg hover:cursor-pointer hover:bg-blue-700 hover:underline hover:underline-offset-8 transition-all'>Product Performance</li> */}
                </ul>

                <div className='fixed left-0 bottom-0 p-4'>
                    <button onClick={handleLogout} className='flex items-center space-x-2 font-bold text-xl text-gray-100 px-4 py-1 rounded-lg hover:bg-blue-zodiac-900 hover:text-white transition-all duration-500'>
                        <SlLogout/> <span>
                            Logout
                        </span>
                    </button>
                </div>
            </div>
            <div className='md:hidden grid grid-cols-3 bg-white text-black sticky top-0 box-content items-center  px-4 py-3 justify-between border border-b-gray-500'>
                <div className=''>
                    <button className="hamburger inline-block cursor-pointer h-10 md:hidden" onClick={toggleMenu}>
                        <div className="line h-0.5 w-5 my-1 bg-black"></div>
                        <div className="line h-0.5 w-5 my-1 bg-black"></div>
                        <div className="line h-0.5 w-5 my-1 bg-black"></div>
                    </button>
                    <ul className='menu -translate-x-full z-10 flex absolute left-0 w-screen flex-col items-center mt-3 bg-white border border-b-gray-500 transition-all'>
                        <Link className='w-full' to='/'>
                            <li onClick={toggleMenu} className='bg-white font-bold w-full flex border border-b-gray-300 hover:cursor-pointer hover:text-white hover:bg-blue-700 hover:underline hover:underline-offset-8 transition-all'>
                                {/* <img src="/home.svg" alt="" className='w-6' /> */}
                                <span className='text-2xl px-2 py-5 w-full'>Home</span>
                            </li>
                        </Link>
                        <Link className='w-full' to='/keyword_suggestion'>
                            <li onClick={toggleMenu} className='bg-white font-bold w-full flex border border-b-gray-300 hover:cursor-pointer hover:text-white hover:bg-blue-700 hover:underline hover:underline-offset-8 transition-all'>
                                {/* <img src="/keyword_suggestion.svg" alt="" className='w-6' /> */}
                                <span className='text-2xl px-2 py-5 w-full'>Keyword Suggestions</span>
                            </li>
                        </Link>
                        <Link className='w-full' to='/'>
                            <li onClick={toggleMenu} className='bg-white font-bold w-full flex border border-b-gray-300 hover:cursor-pointer hover:text-white hover:bg-blue-700 hover:underline hover:underline-offset-8 transition-all'>
                                {/* <img src="/product_performance.svg" alt="" className='w-6' /> */}
                                <span className='text-2xl px-2 py-5 w-full'>Product Performance</span>
                            </li>
                        </Link>
                        <Link className='w-full' to='/'>
                            <li onClick={toggleMenu} className='bg-white font-bold w-full flex border border-b-gray-300 hover:cursor-pointer hover:text-white hover:bg-blue-700 hover:underline hover:underline-offset-8 transition-all'>
                                {/* <img src="/product_performance.svg" alt="" className='w-6' /> */}
                                <span className='text-2xl px-2 py-5 w-full' onClick={handleLogout}>Logout</span>
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className='text-center'>
                    <Link to='/'>
                        <span className='text-blue-500'>Ecommerce</span>
                    </Link>
                </div>
                <div className='text-right'>
                    <span>{name}</span>
                </div>
            </div>
        </>
    )
}

export default NavBar