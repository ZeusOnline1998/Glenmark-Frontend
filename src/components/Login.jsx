import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const host = process.env.REACT_APP_SERVER_URL;

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            // navigate("/");
        }
        else {
            //Do nothing;

        }
    }, [navigate])


    const handleOnSubmit = async (e) => {
        e.preventDefault();
        // const response = await fetch(`${host}/api/user_login/`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-type': 'application/json',
        //     },
        //     body: JSON.stringify(credentials)
        // });
        // const response = axios({
        //     method: 'POST',
        //     url: `${host}/api/user_login/`,
        //     data: credentials,
        // })
        // const json = await response.json();
        // console.log(json);
        // if (json.access) {
        //     localStorage.setItem('token', json.access);
        //     localStorage.setItem('refresh', json.refresh);
        //     navigate('/');
        // }
        // else {
        //     console.log("Invalid Credentials");
        // }
        axios({
            method: 'POST',
            url: `${host}/api/user_login/`,
            data: credentials,
        })
            .then((response) => {
                return response.data
            })
            .then((data) => {
                if (data.access) {
                    console.log(data)
                    localStorage.setItem('token', data.access);
                    localStorage.setItem('refresh', data.refresh);
                    navigate('/');
                }
                else {
                    console.log("Invalid Credentials");
                }
            })
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className= "h-screen bg-gradient-to-b from-gray-500 to-gray-700">
            <img src="/logo.png" alt="" className='hidden lg:block lg:absolute p-10'/>
            <div className="container h-full flex lg:justify-end lg:pr-48 lg:flex-row flex-col items-center justify-center mx-auto">
                <div className="space-y-4">
                    <form onSubmit={handleOnSubmit} className="flex flex-col bg-white p-4 items-center rounded-lg w-96 space-y-3 shadow-2xl">
                        <label htmlFor="email" className='w-full text-left font-semibold text-gray-700'>Email Address</label>
                        <input type="email" className="border border-gray-300 py-3 rounded-lg w-full pl-4" placeholder="Email address " value={credentials.email} name="email" id="email" onChange={onChange} />
                        <div className='w-full flex justify-between'>
                            <label htmlFor="email" className='w-full text-left font-semibold text-gray-700'>Password</label>
                            <span className="text-sm w-full text-right text-blue-600 font-medium hover:underline hover:cursor-pointer">Forgotten password?</span>
                        </div>
                        <input type="password" className="border border-gray-300 py-3 rounded-lg w-full pl-4" placeholder="Password" value={credentials.password} name="password" id="password" onChange={onChange} />
                        <hr className="h-px w-1/2 my-8 bg-gray-700 border dark:bg-gray-700" />
                        <button className="btn w-full rounded-lg bg-blue-500 hover:bg-blue-700 text-white font-bold text-xl box-border py-3">Log in</button>
                        {/* <button className="btn py-3 px-3 w-fit bg-green-500 hover:bg-green-600 text-white font-bold text-lg rounded-lg">Create new account</button> */}
                    </form>
                    
                </div>
            </div>
        </div>
    )
}

export default Login