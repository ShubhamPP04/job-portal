import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({job}) => {
    const navigate = useNavigate();
    return (
        <div 
            onClick={()=> navigate(`/description/${job._id}`)} 
            className='p-4 sm:p-5 rounded-md shadow-md sm:shadow-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 cursor-pointer
                       transition-all duration-300 ease-in-out hover:shadow-lg sm:hover:shadow-2xl hover:scale-102 sm:hover:scale-105'
        >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h1 className='font-medium text-base sm:text-lg text-[#F83002] dark:text-red-500'>{job?.company?.name}</h1>
                <p className='text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-0'>India</p>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2 text-[#0393D1] dark:text-[#0393D1]'>{job?.title}</h1>
                <p className='text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-2'>{job?.description}</p>
            </div>
            <div className='flex flex-wrap items-center gap-2 mt-3 sm:mt-4'>
                <Badge className={'text-[#0393D1] font-bold dark:text-[#0393D1] text-xs sm:text-sm'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'text-[#F83002] font-bold dark:text-red-500 text-xs sm:text-sm'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#0393D1] font-bold dark:text-[#0393D1] text-xs sm:text-sm'} variant="ghost">{job?.salary}LPA</Badge>
            </div>
        </div>
    )
}

export default LatestJobCards