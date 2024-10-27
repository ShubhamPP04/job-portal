import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery]);

    return (
        <div className="bg-white dark:bg-gray-900 min-h-screen">
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5 px-4'>
                <div className='flex flex-col md:flex-row gap-5'>
                    <div className='md:w-1/4 mb-4 md:mb-0'>
                        <button 
                            className="md:hidden w-full bg-blue-500 text-white dark:bg-blue-600 dark:text-white py-2 px-4 rounded mb-4"
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            {showFilters ? 'Hide Filters' : 'Show Filters'}
                        </button>
                        <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
                            <FilterCard />
                        </div>
                    </div>
                    {
                        filterJobs.length <= 0 ? (
                            <span className="text-center w-full text-gray-600 dark:text-gray-300">Job not found</span>
                        ) : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                                    {
                                        filterJobs.map((job) => (
                                            <motion.div
                                                initial={{ opacity: 0, y: 50 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -50 }}
                                                transition={{ duration: 0.3 }}
                                                key={job?._id}>
                                                <Job job={job} />
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Jobs