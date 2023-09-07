import React, { useEffect, useState } from 'react'
import { TbBrandProducthunt } from 'react-icons/tb'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const ProductPerformance = () => {

  const [product, setProduct] = useState(null);
  const location = useLocation();
  const host = process.env.REACT_APP_SERVER_URL

  const getProduct = async () => {
    axios.get(`${host}/api/get_product_details/`, {
      headers: {
        'Authorization': `JWT ${localStorage.getItem('token')}`
      },
      params: {
        'product_id': 1
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
      <div className='bg-white px-4 py-4 text-2xl font-semibold border border-b-gray-400 rounded-b shadow-lg sticky top-0'>
        <div className='flex items-center space-x-4'><TbBrandProducthunt className='text-3xl' /><span>Product Performance</span></div>
      </div>
      {
        product !== null &&
        <div>
          <div className='h-28 flex items-center justify-center'>
            <span className='text-3xl font-semibold'>Price Results</span>
          </div>
          <div className="px-14">
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
                    <div className='mt-5 flex flex-col items-center'>
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
        </div>
      }
    </>
  )
}

export default ProductPerformance