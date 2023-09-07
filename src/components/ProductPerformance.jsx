import React, { useEffect, useState } from 'react'
import { TbBrandProducthunt } from 'react-icons/tb'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const ProductPerformance = () => {

  const [product, setProduct] = useState(null);
  const location = useLocation();
  const host = process.env.REACT_APP_SERVER_URL

  const { product_id } = location.state

  const getProduct = async () => {
    console.log(product_id)
    axios.get(`${host}/api/get_product_details/`, {
      headers: {
        'Authorization': `JWT ${localStorage.getItem('token')}`
      },
      params: {
        'product_id': product_id
      }
    })
      .then((response) => {
        return response.data
      }).then(data => {
        console.log(data)
        setProduct(data)
      }
      )
  }
  useEffect(() => {
    getProduct();
    // eslint-disable-next-line
  }, [])

  const capitalFirstLetter = (word) => {
    if (typeof word !== 'string' || word.length === 0) {
      return word; // Return unchanged if the input is not a non-empty string
    }

    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  return (
    <>
      <div className='bg-white px-4 py-4 text-2xl font-semibold border border-b-gray-400 rounded-b shadow-lg md:sticky md:top-0'>
        <div className='flex items-center space-x-4'><TbBrandProducthunt className='text-3xl' /><span>Product Performance</span></div>
      </div>
      {
        product !== null &&
        <div>
          <div className='h-28 flex items-center justify-center'>
            <span className='text-3xl font-semibold'>Product Report</span>
          </div>
          <div className="px-2 md:px-14">
            <div className="flex items-center justify-center text-center">
              <table className="w-full bg-white rounded-2xl shadow-xl">
                <tr className="table-shadow rounded-xl">
                  <th className="px-4 py-4 bg-blue-zodiac-900 text-white font-medium">Product</th>
                  <th className="px-4 py-4 bg-blue-zodiac-900 text-white font-medium">Platform</th>
                  <th className="px-4 py-4 bg-blue-zodiac-900 text-white font-medium">Brand</th>
                  <th className="px-4 py-4 bg-blue-zodiac-900 text-white font-medium">Overall Rating</th>
                </tr>
                <tr>
                  <td className='py-4'>
                    <div className='flex flex-col items-center justify-center'>
                      <img src="/logo192.png" alt="" />
                      <span>{product.name}</span>
                    </div>
                  </td>
                  <td>{capitalFirstLetter(product.platform)}</td>
                  <td>{product.brand}</td>
                  <td className=''>
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
                    
                  </td>
                </tr>
              </table>
            </div>
              
          </div>
            <div className='px-2 md:px-14 py-8 grid lg:grid-cols-2 grid-cols-1 w-full lg:space-x-10 space-y-10 lg:space-y-0 lg:pb-28 pb-56'>
              <table className='w-full bg-white rounded-2xl shadow-xl'>
                <tr>
                  <th className='px-4 py-2 md:py-4 bg-blue-zodiac-900 text-white font-medium'>Seller</th>
                  <th className='px-4 py-2 md:py-4 bg-blue-zodiac-900 text-white font-medium'>Price</th>
                  <th className='px-4 py-2 md:py-4 bg-blue-zodiac-900 text-white font-medium'>Availability</th>
                  <th className='px-4 py-2 md:py-4 bg-blue-zodiac-900 text-white font-medium'>Main Seller</th>
                </tr>
                <tr className=''>
                  <td className='py-4 px-2 md:px-4 text-center'><span>{capitalFirstLetter(product.seller)}</span></td>
                  <td className='py-4 px-2 md:px-4 text-center'><span>{product.price}</span></td>
                  <td className='py-4 px-2 md:px-4 text-center'><span>{product.availability === 1 ? "Instock" : "Out of Stock"}</span></td>
                  <td className='py-4 px-2 md:px-4 text-center'><span>{product.main_seller}</span></td>
                </tr>
              </table>
              <div className='relative flex justify-center bg-white shadow-lg rounded-lg'>
                <span className='absolute left-0 px-5 w-fit text-center py-4 font-semibold text-xl'>Rating</span>
                <img src="/logo192.png" alt="" />
              </div>
            </div>
        </div>
      }
    </>
  )
}

export default ProductPerformance