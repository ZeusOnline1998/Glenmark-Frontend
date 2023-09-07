import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import axios from 'axios';
import Platform from './Platform';
import { FaArrowTrendUp, FaArrowTrendDown } from 'react-icons/fa6';
import { BsStar } from 'react-icons/bs';

const ProductList = () => {

    let ratings = [];
    const [products, setProducts] = useState([]);
    const [productRatings, setProductRatings] = useState([]);
    const location = useLocation();
    const host = process.env.REACT_APP_SERVER_URL

    const getProductDetails = async () => {
        console.log(location.state.value)
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
                setProducts(data)
            }
            )
    }

    const getRatings = () => {
        console.log('hello')
        const uniqueData = Array.from(
            new Set(products.map((item) => item.product_id))
        ).map((id) => {
            return products.find((item) => item.product_id === id);
        });

        setProductRatings(uniqueData);
    }
    useEffect(() => {
        if (location.state === null) {
        }
        else {
            getProductDetails();

        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        getRatings();
    }, [products])

    const capitalFirstLetter = (word) => {
        if (typeof word !== 'string' || word.length === 0) {
            return word; // Return unchanged if the input is not a non-empty string
        }

        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    return (
        <>
            <div className='bg-white px-4 py-4 text-2xl font-semibold border border-b-gray-400 rounded-b shadow-lg lg:sticky lg:top-0'>
                <Platform />
            </div>
            {
                products.length > 0 &&
                <div className='grid grid-rows-1'>
                    <div className='h-28 flex items-center justify-center'>
                        <span className='text-xl'>Price Results</span>
                    </div>
                    <div className='px-4 sm:px-14'>
                        <div className='flex items-center justify-center text-center'>
                            <table className='w-full bg-white rounded-3xl border-none shadow-xl'>
                                <thead>
                                    <tr className='table-shadow rounded-xl'>
                                        <th className='px-1md:px-4 py-4 bg-blue-zodiac-900 text-white font-medium'>Platform</th>
                                        <th className='px-1md:px-4 py-4 bg-blue-zodiac-900 text-white font-medium'>Product</th>
                                        <th className='px-1md:px-4 py-4 bg-blue-zodiac-900 text-white font-medium'>Today's Price</th>
                                        <th className='px-1md:px-4 py-4 bg-blue-zodiac-900 text-white font-medium'>Price Change</th>
                                        <th className='px-1md:px-4 py-4 bg-blue-zodiac-900 text-white font-medium'></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => {
                                        return (
                                            <tr className='border border-b-2' key={product.product_details_id}>
                                                <td className='py-4'>{capitalFirstLetter(product.platform)}</td>
                                                <td className='py-4'>{product.product_name}</td>
                                                <td className='py-4'>{product.today_price}</td>
                                                {product.change === 1 ?
                                                    <td ><span className='flex items-center justify-center space-x-2 md:space-x-4 h-full text-red-500'><span>{product.yesterday_price}</span><FaArrowTrendDown /> </span> </td> :
                                                    product.change === -1 ?
                                                        <td ><span className='flex items-center justify-center space-x-2 md:space-x-4 h-full text-green-500'><span>{product.yesterday_price}</span> <FaArrowTrendUp /> </span></td> :
                                                        product.change === 0 ?
                                                            <td>No change</td> :
                                                            <td className='text-red-500'>No Previous Data</td>
                                                }
                                                <td className='py-4'>
                                                    <Link to='/product_performance' state={{ product_id: product.product_details_id }}>
                                                        <span className='bg-gradient-to-r w-auto h-auto from-blue-zodiac-900 to-blue-zodiac-950 text-white px-2 md:px-4 py-1 md:py-2 rounded-lg mx-4'>Report</span>
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='h-28 flex items-center justify-center'>
                        <span className='text-xl'>Rating Results</span>
                    </div>
                    <div className='px-4 sm:px-14 lg:pb-28 pb-56'>
                        <div className='flex items-center justify-center text-center'>
                            <table className='w-full bg-white rounded-3xl border-none shadow-xl'>
                                <thead>
                                    <tr className='table-shadow rounded-xl'>
                                        <th className='px-4 py-4 bg-blue-zodiac-900 text-white font-medium'>Platform</th>
                                        <th className='px-4 py-4 bg-blue-zodiac-900 text-white font-medium'>Product</th>
                                        <th className='px-4 py-4 bg-blue-zodiac-900 text-white font-medium'>Ratings</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        productRatings.map(product => {
                                            return (
                                                <tr className='border border-b-2' key={product.product_id}>
                                                    <td className='py-4'>{capitalFirstLetter(product.platform)}</td>
                                                    <td className='py-4'>{product.product_name}</td>
                                                    <td className='py-4'>{product.overall_rating}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default ProductList