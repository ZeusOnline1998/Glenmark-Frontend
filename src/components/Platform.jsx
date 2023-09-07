import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios';

const Platform = () => {

    const [products, setProducts] = useState([]);
    const location = useLocation();
    const host = process.env.REACT_APP_SERVER_URL

    const getProductDetails = async () => {
        axios.get(`${host}/api/get_products_list/`, {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('token')}`
            },
            params: {
                'platform': location.state.value
            }
        })
            .then((response) => {
                return response.data
            }).then(data => {
                console.log(data)
                // setProducts(data)
            }
            )
    }
    useEffect(() => {
        getProductDetails();
        // eslint-disable-next-line
    }, [])


    return (
        <>
            <div>{location.state.value}</div>
            <div>{products}</div>
        </>
    )
}

export default Platform