import React, { useEffect, useState } from 'react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => { 
    const {allAdminJobs, searchJobByText} = useSelector(store=>store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true;
            };
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText])

    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">Posted Jobs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterJobs?.map((job) => (
                    <div key={job._id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <Avatar className="w-16 h-16 border-2 border-gray-200 dark:border-gray-600">
                                    <AvatarImage src={job.company?.logo} alt={`${job.company?.name} logo`} />
                                </Avatar>
                                <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer" />
                                    </PopoverTrigger>
                                    <PopoverContent className="bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
                                        <div 
                                            onClick={() => navigate(`/admin/companies/${job.company?._id}?tab=jobs`)} 
                                            className='flex items-center gap-2 w-fit cursor-pointer hover:bg-[#0393D1]/10 dark:hover:bg-[#0393D1]/30 p-2 rounded transition-colors duration-200'
                                        >
                                            <Edit2 className='w-4 text-[#0393D1] dark:text-[#0393D1]' />
                                            <span className='text-[#0393D1] dark:text-[#0393D1]'>Edit</span>
                                        </div>
                                        <div 
                                            onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} 
                                            className='flex items-center gap-2 w-fit cursor-pointer hover:bg-[#0393D1]/10 dark:hover:bg-[#0393D1]/30 p-2 rounded transition-colors duration-200 mt-2'
                                        >
                                            <Eye className='w-4 text-[#0393D1] dark:text-[#0393D1]' />
                                            <span className='text-[#0393D1] dark:text-[#0393D1]'>Applicants</span>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">{job.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-2">{job.company?.name}</p>
                            <p className="text-gray-600 dark:text-gray-400">Posted: {new Date(job.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminJobsTable