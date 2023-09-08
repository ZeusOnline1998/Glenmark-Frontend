import React, { useEffect, useState } from 'react'
import { TbBrandProducthunt } from 'react-icons/tb'
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import $ from 'jquery';

const ProductPerformance = () => {

  const [product, setProduct] = useState(null);
  const [product_seller, setProduct_seller] = useState(null);
  const location = useLocation();
  const [brands, setBrands] = useState(null);
  const [optionBrand, setOptionBrand] = useState("");
  const [ProductList, setProductList] = useState(null);
  const [change, setChange] = useState(null);
  const host = process.env.REACT_APP_SERVER_URL

  // const {splatform, sproduct} = location.state

  const { product_id, platform_id, changed } = location.state

  const getProduct = async (product_id, platform_id) => {
    console.log(product_id)
    axios.get(`${host}/api/get_product_details_2/`, {
      headers: {
        'Authorization': `JWT ${localStorage.getItem('token')}`
      },
      params: {
        'product_id': product_id,
        'platform_id': platform_id,
      }
    })
      .then((response) => {
        return response.data
      }).then(data => {
        console.log(data)
        setProduct(data)
        setProduct_seller(data.seller)
      }
      )
  }

  const getBrands = async () => {
    axios.get(`${host}/api/get_brand_list/`, {
      headers: {
        'Authorization': `JWT ${localStorage.getItem('token')}`
      }
    }).then((response) => {
      return response.data
    }).then(data => {
      console.log(data)
      setBrands(data)
    })
  }

  useEffect(() => {

    getBrands();
    if (change === null) {
      setProductList(null)
      setChange(change)
    }
  }, [change])
  useEffect(() => {
    if (product_id !== null) {

      console.log(product_id)
      getProduct(product_id, platform_id);
    }
    // eslint-disable-next-line
  }, [location.state.product_id])

  const capitalFirstLetter = (word) => {
    if (typeof word !== 'string' || word.length === 0) {
      return word; // Return unchanged if the input is not a non-empty string
    }

    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  const handleBrandFormSubmit = (e) => {
    e.preventDefault();
    if (optionBrand !== "") {
      axios.get(`${host}/api/get_performance_product_list/`, {
        headers: {
          'Authorization': `JWT ${localStorage.getItem('token')}`
        },
        params: {
          'brand': optionBrand
        }
      }).then((response) => {
        return response.data
      }).then(data => {
        setProductList(data)
      })
    }
    else{
      setProductList(null);
      setProduct(null);
    }
  }

  const handleOnChange = (e) => {
    setOptionBrand(e.target.value);
  }

  const toggleProductMenu = () => {
    $('.product-menu').toggleClass('hidden');
  }

  return (
    <>
      <div className='bg-white px-4 py-4 text-2xl font-semibold border border-b-gray-400 rounded-b shadow-lg md:sticky md:top-0'>
        <div className='flex items-center space-x-4'><TbBrandProducthunt className='text-3xl' /><span>Product Performance</span></div>
      </div>
      <div className='flex justify-end p-4'>
        {
          brands !== null &&
          <form method="get" onSubmit={handleBrandFormSubmit} className='space-x-10 pr-10 text-lg'>
            <select name="brand" id="brand" value={optionBrand} onChange={handleOnChange} className='bg-gray-100 hover:bg-gray-50 active:bg-gray-100 border transition-colors duration-500 border-gray-300 px-4 py-2 rounded-lg shadow-lg'>
              <option value="">Brand</option>
              {
                brands.map(brand => {
                  return <option value={brand.id}>{brand.brand}</option>
                })
              }
            </select>
            <button type="submit" className='bg-blue-zodiac-900 text-white hover:bg-blue-zodiac-800 active:bg-blue-zodiac-900 px-4 py-2 rounded-lg shadow-lg transition-colors duration-500'>Get Products</button>
          </form>
        }
      </div>
      <div>
        {
          ProductList !== null &&
          <div className='px-10 cursor-pointer'>
              <span className='flex px-6 w-fit space-x-9 bg-gray-50 transition-colors py-2 justify-between items-center border border-gray-300 text-xl font-semibold text-left rounded-lg hover:bg-white active:bg-gray-100' onClick={toggleProductMenu}>
              Products List
            </span>
              <ul className='product-menu absolute hidden w-fit bg-white mr-10 text-lg font-semibold text-gray-700 rounded shadow-lg'>
                {
                  ProductList.map(data => {
                    return (
                      <li className='w-full box-border px-4 hover:bg-gray-100' onClick={toggleProductMenu}>
                        <Link to='/product_performance' className='flex py-3' state={{ product_id: data.id, platform_id: data.platform }}>{data.product_name} - {data.platform_name}</Link>
                      </li>
                    )
                  })
                }
              </ul>
          </div>
          
        }
      </div>
      {
        product_id !== null && product !== null &&
        <div>
          <div className='h-28 flex items-center justify-center'>
            <span className='text-3xl font-semibold'>Product Report</span>
          </div>
          <div className="px-4 md:px-14">
            <div className="flex items-center justify-center text-center">
              <table className="w-full bg-white rounded-2xl shadow-xl">
                <tr className="table-shadow rounded-xl">
                    <th className="px-4 py-4 bg-blue-zodiac-900 text-white font-medium rounded-tl-2xl">Product</th>
                  <th className="px-4 py-4 bg-blue-zodiac-900 text-white font-medium">Platform</th>
                  <th className="px-4 py-4 bg-blue-zodiac-900 text-white font-medium">Brand</th>
                    <th className="px-4 py-4 bg-blue-zodiac-900 text-white font-medium rounded-tr-2xl">Overall Rating</th>
                </tr>
                <tr>
                  <td className='py-4'>
                    <div className='flex flex-col items-center justify-center'>
                      <img src="/logo192.png" alt="" className='w-32' />
                      <span>{product.name}</span>
                    </div>
                  </td>
                  <td>{capitalFirstLetter(product.platform)}</td>
                  <td>{product.brand}</td>
                  <td className=''>
                    <div className='py-2'>
                      <span>Total Rating: {product.total_ratings}</span>
                      <div className='mt-5 flex flex-col items-center mr-2'>
                        {/* <span className='flex items-center space-x-1 w-full'>
                        <span>5.0</span> <FaStar className='text-green-500' />
                        <FaStar className='text-green-500' /> <FaStar className='text-green-500' /> <FaStar className='text-green-500' /> <FaStar className='text-green-500' />
                        <span>{product.five_stars_rating}</span>
                      </span>
                      <span className='flex items-center space-x-1 w-full'>
                        <span>4.0</span> <FaStar className='text-green-500' />
                        <FaStar className='text-green-500' /> <FaStar className='text-green-500' /> <FaStar className='text-green-500' /> <FaStar className='text-white' />
                        <span>{product.four_stars_rating}</span>
                      </span>
                      <span className='flex items-center space-x-1 w-full'>
                        <span>3.0</span> <FaStar className='text-yellow-500' />
                        <FaStar className='text-yellow-500' /> <FaStar className='text-yellow-500' /> <FaStar className='text-white' /> <FaStar className='text-white' />
                        <span>{product.three_stars_rating}</span>
                      </span>
                      <span className='flex items-center space-x-1 w-full'>
                        <span>2.0</span> <FaStar className='text-red-500' />
                        <FaStar className='text-red-500' /> <FaStar className='text-white' /> <FaStar className='text-white' /> <FaStar className='text-white' />
                        <span>{product.two_stars_rating}</span>
                      </span>
                      <span className='flex items-center space-x-1 w-full'>
                        <span>1.0</span> <FaStar className='text-red-500' />
                        <FaStar className='text-white' /> <FaStar className='text-white' /> <FaStar className='text-white' /> <FaStar className='text-white' />
                        <span>{product.one_star_rating}</span>
                      </span> */}
                        <table className='text-left'>
                          <tr>
                            <td>5.0</td>
                            <td>
                              <div className='flex'>
                                <FaStar className='text-green-500' /> <FaStar className='text-green-500' /> <FaStar className='text-green-500' /> <FaStar className='text-green-500' /> <FaStar className='text-green-500' />
                              </div>
                            </td>
                            <td>{product.five_stars_rating}</td>
                          </tr>
                          <tr>
                            <td>4.0</td>
                            <td>
                              <div className='flex'>
                                <FaStar className='text-green-500' /> <FaStar className='text-green-500' /> <FaStar className='text-green-500' /> <FaStar className='text-green-500' /> <FaStar className='text-white' />
                              </div>
                            </td>
                            <td>{product.four_stars_rating}</td>
                          </tr>
                          <tr>
                            <td>3.0</td>
                            <td>
                              <div className='flex'>
                                <FaStar className='text-yellow-500' /> <FaStar className='text-yellow-500' /> <FaStar className='text-yellow-500' /> <FaStar className='text-white' /> <FaStar className='text-white' />
                              </div>
                            </td>
                            <td>{product.three_stars_rating}</td>
                          </tr>
                          <tr>
                            <td>2.0</td>
                            <td>
                              <div className='flex'>
                                <FaStar className='text-red-500' /> <FaStar className='text-red-500' /> <FaStar className='text-white' /> <FaStar className='text-white' /> <FaStar className='text-white' />
                              </div>
                            </td>
                            <td>{product.two_stars_rating}</td>
                          </tr>
                          <tr>
                            <td>1.0</td>
                            <td>
                              <div className='flex'>
                                <FaStar className='text-red-500' /> <FaStar className='text-white' /> <FaStar className='text-white' /> <FaStar className='text-white' /> <FaStar className='text-white' />
                              </div>
                            </td>
                            <td>{product.one_star_rating}</td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </td>
                </tr>
              </table>
            </div>

          </div>
          <div className='px-4 md:px-14 py-8 flex lg:flex-row flex-col w-full lg:space-x-10 space-y-10 lg:space-y-0 lg:pb-28 pb-56'>
              <div className='lg:w-1/2 overflow-y-auto h-56'>
                <table className='bg-white rounded-2xl shadow-xl w-full'>
                <tr>
                  <th className='px-4 py-2 md:py-4 bg-blue-zodiac-900 text-white font-medium rounded-tl-2xl'>Seller</th>
                  <th className='px-4 py-2 md:py-4 bg-blue-zodiac-900 text-white font-medium'>Price</th>
                  <th className='px-4 py-2 md:py-4 bg-blue-zodiac-900 text-white font-medium'>Availability</th>
                    <th className='px-4 py-2 md:py-4 bg-blue-zodiac-900 text-white font-medium rounded-tr-2xl'>Main Seller</th>
                </tr>
                {
                  product_seller.map(data => {
                    return (
                      <tr className=''>
                        <td className='py-4 px-2 md:px-4 text-center'><span>{capitalFirstLetter(data.seller)}</span></td>
                        <td className='py-4 px-2 md:px-4 text-center'><span>{data.price}</span></td>
                        <td className='py-4 px-2 md:px-4 text-center'><span>{data.availability === 1 ? "Instock" : "Out of Stock"}</span></td>
                        <td className='py-4 px-2 md:px-4 text-center'><span>{data.main_seller}</span></td>
                      </tr>
                    )
                  })
                }
              </table>
            </div>
            <div className='lg:w-1/2 relative flex justify-center overflow-hidden bg-white shadow-lg rounded-lg'>
              <span className='absolute left-0 px-5 w-fit text-center py-4 font-semibold text-xl'>Rating</span>
              <div className='w-[200]px h-[200px] overflow-hidden'>
                <div className='flex justify-center pt-4'>
                  <img src="/meter.png" alt="" className='h-auto w-2/3' />
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default ProductPerformance