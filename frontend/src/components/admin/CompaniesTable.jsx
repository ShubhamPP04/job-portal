import React, { useEffect, useState } from 'react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if (!searchCompanyByText) {
                return true
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText])

    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">Registered Companies</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterCompany?.map((company) => (
                    <div key={company._id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <Avatar className="w-16 h-16 border-2 border-gray-200 dark:border-gray-600">
                                    <AvatarImage src={company.logo} alt={`${company.name} logo`} />
                                </Avatar>
                                <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer" />
                                    </PopoverTrigger>
                                    <PopoverContent className="bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
                                        <div 
                                            onClick={() => navigate(`/admin/companies/${company._id}`)} 
                                            className='flex items-center gap-2 w-fit cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/30 p-2 rounded transition-colors duration-200'
                                        >
                                            <Edit2 className='w-4 text-blue-600 dark:text-blue-400' />
                                            <span className='text-blue-600 dark:text-blue-400'>Edit</span>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">{company.name}</h3>
                            <p className="text-gray-600 dark:text-gray-400">Created: {company.createdAt.split("T")[0]}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CompaniesTable