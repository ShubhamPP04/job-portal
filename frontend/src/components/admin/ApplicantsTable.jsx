import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        console.log('called');
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            console.log(res);
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">Applicants</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {applicants && applicants?.applications?.map((item) => (
                    <div key={item._id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{item?.applicant?.fullname}</h3>
                                <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer" />
                                    </PopoverTrigger>
                                    <PopoverContent className="bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
                                        {shortlistingStatus.map((status, index) => (
                                            <div 
                                                onClick={() => statusHandler(status, item?._id)} 
                                                key={index} 
                                                className='flex items-center gap-2 w-fit cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/30 p-2 rounded transition-colors duration-200'
                                            >
                                                <span className='text-blue-600 dark:text-blue-400'>{status}</span>
                                            </div>
                                        ))}
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 mb-2">Email: {item?.applicant?.email}</p>
                            <p className="text-gray-600 dark:text-gray-400 mb-2">Contact: {item?.applicant?.phoneNumber}</p>
                            {item.applicant?.profile?.resume && (
                                <p className="mb-2">
                                    <a className="text-blue-600 cursor-pointer hover:underline" href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">
                                        Resume: {item?.applicant?.profile?.resumeOriginalName}
                                    </a>
                                </p>
                            )}
                            <p className="text-gray-600 dark:text-gray-400">Applied: {item?.applicant.createdAt.split("T")[0]}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ApplicantsTable