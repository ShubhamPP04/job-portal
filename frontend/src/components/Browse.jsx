import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Browse = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const dispatch = useDispatch();
    const [filteredJobs, setFilteredJobs] = useState([]);

    useGetAllJobs();

    useEffect(() => {
        if (searchedQuery) {
            const filtered = allJobs.filter(job => 
                job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            );
            setFilteredJobs(filtered);
        } else {
            setFilteredJobs(allJobs);
        }
    }, [searchedQuery, allJobs]);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-5 px-4 sm:px-6 lg:px-8'>
                <h1 className='font-bold text-lg sm:text-xl my-5 sm:my-10'>
                    {searchedQuery ? `Search Results for "${searchedQuery}"` : 'All Jobs'} ({filteredJobs.length})
                </h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {filteredJobs.length > 0 ? (
                        filteredJobs.map((job) => (
                            <div key={job._id} className="transform transition duration-300 hover:scale-105 hover:shadow-lg rounded-lg overflow-hidden">
                                <Job job={job}/>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-500">No jobs found matching your search criteria.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Browse;