import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Bookmark, MapPin, Clock, DollarSign, Briefcase } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { toggleJobBookmark } from '@/redux/jobSlice' // You'll need to create this action

const Job = ({job, onBookmarkToggle }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const bookmarkedJobs = useSelector(state => state.job.bookmarkedJobs);
    const [bookmarked, setBookmarked] = useState(bookmarkedJobs.includes(job._id));

    useEffect(() => {
        setBookmarked(bookmarkedJobs.includes(job._id));
    }, [bookmarkedJobs, job._id]);

    const toggleBookmark = async () => {
        try {
            const response = await axios.post(`${JOB_API_END_POINT}/${job._id}/bookmark`, {}, { withCredentials: true });
            dispatch(toggleJobBookmark(job._id));
            if (onBookmarkToggle) {
                onBookmarkToggle(job._id, response.data.bookmarked);
            }
            toast.success(response.data.message);
        } catch (error) {
            console.error('Error toggling bookmark:', error);
            toast.error('Failed to bookmark job');
        }
    }

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }
    
    return (
        <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col"
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
            <div className='flex justify-between items-start mb-4'>
                <div className='flex items-center space-x-4'>
                    <Avatar className="h-12 w-12">
                        <AvatarImage src={job?.company?.logo} alt={`${job?.company?.name} logo`} />
                    </Avatar>
                    <div>
                        <h2 className='font-semibold text-lg text-gray-800 dark:text-white'>{job?.company?.name}</h2>
                        <p className='text-sm text-gray-500 dark:text-gray-400'>{job?.location || 'Location not specified'}</p>
                    </div>
                </div>
                <Button 
                    variant="ghost" 
                    size="sm"
                    className={`rounded-full p-0 h-8 w-8 ${
                        bookmarked ? 'text-blue-500' : 'text-gray-400 dark:text-gray-300'
                    }`}
                    onClick={toggleBookmark}
                >
                    <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
                </Button>
            </div>

            <h1 className='font-bold text-xl mb-3 text-gray-900 dark:text-white'>{job?.title}</h1>

            <div className='flex flex-wrap items-center gap-3 mb-4 text-sm text-gray-600 dark:text-gray-300'>
                <Badge variant="secondary" className='bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'>
                    {job?.position} Positions
                </Badge>
                <Badge variant="secondary" className='bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'>
                    {job?.jobType}
                </Badge>
                <Badge variant="secondary" className='bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'>
                    {job?.salary} LPA
                </Badge>
            </div>

            <div className='mb-4 flex-grow'>
                <p className='text-sm text-gray-600 dark:text-gray-300 line-clamp-2'>{job?.description}</p>
            </div>

            <div className='flex justify-between items-center mt-auto'>
                <Button 
                    onClick={() => navigate(`/description/${job?._id}`)} 
                    className="bg-white dark:bg-gray-700 text-[#0393D1] border-2 border-[#0393D1] hover:bg-[#0393D1] hover:text-white dark:hover:bg-[#0393D1] dark:text-[#0393D1] dark:hover:text-white transition-colors duration-200 rounded-full py-2 px-6 font-medium text-sm flex items-center space-x-2"
                >
                    <span>Details</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Button>
                <span className='text-sm text-gray-500 dark:text-gray-400'>
                    {daysAgoFunction(job?.createdAt) === 0 ? "Posted Today" : `${daysAgoFunction(job?.createdAt)}d ago`}
                </span>
            </div>
        </motion.div>
    )
}

export default Job