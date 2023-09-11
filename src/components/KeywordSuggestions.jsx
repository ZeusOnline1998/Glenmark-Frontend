import React, { useEffect, useState } from 'react'
import { VscSymbolKeyword } from 'react-icons/vsc'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

const KeywordSuggestions = () => {

    const host = process.env.REACT_APP_SERVER_URL
    const [platformList, setPlatformList] = useState(null);
    const [durationList, setDurationList] = useState(null);
    const [keywordsList, setKeywordsList] = useState(null);
    const [change, setChange] = useState(null);
    const [selectedValues, setSelectedValues] = useState([]);
    const location = useLocation();
    const [filterData, setFilterData] = useState({
        platform: "",
        duration: "",
        keyword: "",
    });
    const [filterResult, setFilterResult] = useState(null);

    // const { changed } = location.state;

    const getPlatform = async () => {
        axios.get(`${host}/api/get_platform_list`, {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            return response.data
        }).then(data => {
            console.log(data)
            setPlatformList(data);
        })
    }

    const getDuration = async () => {
        axios.get(`${host}/api/get_duration_list`, {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            return response.data
        }).then(data => {
            console.log(data)
            setDurationList(data)
        })
    }

    const getKeywords = async () => {
        axios.get(`${host}/api/get_keyword_list`, {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            return response.data
        }).then(data => {
            console.log(data);
            setKeywordsList(data)
        })
    }


    useEffect(() => {
        getPlatform();
        getDuration();
        getKeywords();
        // setChange(changed)
    }, [])

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const { platform, duration, keyword } = filterData;
        if (platform !== "" && duration !== "" && keyword !== "") {
            axios.get(`${host}/api/get_keyword_search_result/`, {
                headers: {
                    'Authorization': `JWT ${localStorage.getItem('token')}`
                },
                params: {
                    'platform': platform,
                    'duration': duration,
                    'keyword': keyword,
                }
            }).then((response) => {
                return response.data
            }).then(data => {
                console.log(data)
                setFilterResult(data)
            })
        }
        else {
            setFilterResult(null);
        }
    }

    const handleOnChange = (e) => {
        setFilterData({ ...filterData, [e.target.name]: e.target.value })
    }

    const handleCheckboxChange = (e) => {
        const value = e.target.value;
        if (e.target.checked) {
            setSelectedValues((prevSelectedValues) => [...prevSelectedValues, value]);
        } else {
            setSelectedValues((prevSelectedValues) =>
                prevSelectedValues.filter((val) => val !== value)
            );
        }
    };

    const handleGenerateReport = (e) => {
        e.preventDefault();
        axios.post(`${host}/api/get_keyword_filtered_data/`, {
            arr: selectedValues
        }, {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('token')}`
            },
        }).then((response) => {
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

            // Create a temporary URL for the Blob
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement('a');

            link.href = url;
            link.download = 'data.xlsx';

            // Trigger the download
            link.click();

            window.URL.revokeObjectURL(url);
        })
    }


    return (
        <>
            <div className='bg-white px-4 py-4 text-2xl font-semibold border border-b-gray-400 rounded-b shadow-lg md:sticky md:top-0'>
                <div className='flex items-center space-x-4'><VscSymbolKeyword className='text-3xl' /><span>Keyword Suggestions</span></div>
            </div>
            <div className='p-4'>
                <div className='lg:flex justify-end'>
                    {
                        (platformList !== null && durationList !== null && keywordsList !== null) &&
                        <form method='get' onSubmit={handleFormSubmit} className='lg:space-x-6 lg:pr-10 text-lg flex flex-col space-y-4 lg:space-y-0 lg:flex-row'>
                                <select name="platform" id="platform" value={filterData.platform} onChange={handleOnChange} className='bg-gray-100 hover:bg-gray-50 active:bg-gray-100 border transition-colors duration-500 border-gray-300 px-4 py-2 rounded-lg shadow-lg'>
                                <option value="">Platform</option>
                                {
                                    platformList.map((data) => {
                                        return <option value={data.id}>{data.platform_name}</option>
                                    })
                                }
                            </select>
                                <select name="duration" id="duration" value={filterData.duration} onChange={handleOnChange} className='bg-gray-100 hover:bg-gray-50 active:bg-gray-100 border transition-colors duration-500 border-gray-300 px-4 py-2 rounded-lg shadow-lg'>
                                <option value="">Duration</option>
                                {
                                    Object.keys(durationList).map((key) => {
                                        return <option value={key}>{durationList[key]}</option>
                                    })
                                }
                            </select>
                                <select name="keyword" id="keyword" value={filterData.keyword} onChange={handleOnChange} className='bg-gray-100 hover:bg-gray-50 active:bg-gray-100 border transition-colors duration-500 border-gray-300 px-4 py-2 rounded-lg shadow-lg'>
                                <option value="">Keyword</option>
                                {
                                    keywordsList.map((data) => {
                                        return <option value={data.id}>{data.keyword}</option>
                                    })
                                }
                            </select>
                                <button type="submit" className='bg-blue-zodiac-900 text-white hover:bg-blue-zodiac-800 active:bg-blue-zodiac-900 px-8 py-2 rounded-lg shadow-lg transition-colors duration-500'>View</button>
                        </form>
                    }
                </div>
                <div className='flex w-full items-center justify-center text-center px-6 py-10'>
                    {
                        filterResult !== null && 
                        <form method="get" onSubmit={handleGenerateReport} className='w-full'>
                            <table className='w-full bg-white rounded-3xl shadow-xl'>
                                <thead className=''>
                                    <td className='bg-blue-zodiac-900 text-white font-medium py-4 rounded-tl-lg'></td>
                                    <td className='bg-blue-zodiac-900 text-white font-medium py-4 '>Platform</td>
                                    <td className='bg-blue-zodiac-900 text-white font-medium py-4 '>Product</td>
                                    <td className='bg-blue-zodiac-900 text-white font-medium py-4 '>Product Name</td>
                                    <td className='bg-blue-zodiac-900 text-white font-medium py-4 rounded-tr-lg'>Date</td>
                                </thead>
                                <tbody>
                                    {
                                        filterResult.map((data) => {
                                            return (
                                                <tr>
                                                    <td className='px-5 text-center border-gray-100 border-b'><input type='checkbox' value={data.id} onChange={handleCheckboxChange}></input></td>
                                                    <td className='px-5 text-center border-gray-100 border-b border-l'>{data.platform}</td>
                                                    <td className='px-5 text-center border-gray-100 border-b border-l'>{data.keyword}</td>
                                                    <td className='px-5 text-justify border-gray-100 border-b border-l'>{data.product_name}</td>
                                                    <td className='px-5 text-center border-gray-100 border-b border-l'>{data.crawl_date}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                                <button type="submit" className='bg-blue-zodiac-900 text-white hover:bg-blue-zodiac-800 active:bg-blue-zodiac-900 px-4 py-2 rounded-lg shadow-lg transition-colors duration-500 mt-5 mb-10'>Generate Report</button>
                        </form>
                    }
                </div>
            </div>
        </>
    )
}

export default KeywordSuggestions