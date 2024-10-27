import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'

const Bookmarks = () => {
    const [bookmarkedJobs, setBookmarkedJobs] = useState([])
    const { user } = useSelector(store => store.auth)

    useEffect(() => {
        const fetchBookmarkedJobs = async () => {
            try {
                const response = await axios.get(`${JOB_API_END_POINT}/bookmarked`, { withCredentials: true })
                setBookmarkedJobs(response.data.bookmarkedJobs)
            } catch (error) {
                console.error('Error fetching bookmarked jobs:', error)
                toast.error('Failed to fetch bookmarked jobs')
            }
        }

        if (user) {
            fetchBookmarkedJobs()
        }
    }, [user])

    const handleBookmarkToggle = (jobId, isBookmarked) => {
        if (!isBookmarked) {
            setBookmarkedJobs(prevJobs => prevJobs.filter(job => job._id !== jobId))
        }
    }

    return (
        <div className="bg-background dark:bg-black min-h-screen">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 dark:text-white">Bookmarked Jobs</h1>
                {bookmarkedJobs.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {bookmarkedJobs.map(job => (
                            <Job 
                                key={job._id} 
                                job={job} 
                                isBookmarked={true}
                                onBookmarkToggle={handleBookmarkToggle}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600 dark:text-gray-400">You haven't bookmarked any jobs yet.</p>
                )}
            </div>
        </div>
    )
}

export default Bookmarks