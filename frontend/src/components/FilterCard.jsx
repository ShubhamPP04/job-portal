import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useTheme } from 'next-themes'
import { Button } from './ui/button'

const filterData = [
    { type: "Location", options: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai", "Haryana"] },
    { type: "Industry", options: ["Frontend Developer", "Backend Developer", "FullStack Developer", "Software Developer", "Design & Creative", "Sales & Marketing", "Writing & Translation", "AI & ML", "Finance & Accounting", "Engineering & Architecture", "Block Chain"] },
    { type: "Salary", options: ["0-40k", "42-1lakh", "1lakh to 5lakh"] },
]

const FilterCard = () => {
    const [selectedValues, setSelectedValues] = useState({});
    const dispatch = useDispatch();
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const changeHandler = (value, filterType) => {
        setSelectedValues(prev => ({ ...prev, [filterType]: value }));
    }

    const clearFilters = () => {
        setSelectedValues({});
        dispatch(setSearchedQuery(''));
    }

    useEffect(() => {
        dispatch(setSearchedQuery(Object.values(selectedValues).join(',')));
    }, [selectedValues]);

    if (!mounted) return null;

    return (
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h2 className='text-lg font-medium dark:text-white'>Filters</h2>
                <Button 
                    onClick={clearFilters}
                    variant="ghost"
                    size="sm"
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    disabled={Object.keys(selectedValues).length === 0}
                >
                    Clear all
                </Button>
            </div>
            {filterData.map(({ type, options }) => (
                <div key={type} className="mb-6">
                    <h3 className='text-sm font-medium mb-3 text-gray-600 dark:text-gray-300'>{type}</h3>
                    <RadioGroup 
                        value={selectedValues[type] || ''} 
                        onValueChange={(value) => changeHandler(value, type)}
                    >
                        {options.map((option) => (
                            <div key={option} className='flex items-center space-x-2 mb-2 group'>
                                <RadioGroupItem 
                                    value={option} 
                                    id={option}
                                    className="border-gray-300 dark:border-gray-600 group-hover:border-blue-500 dark:group-hover:border-blue-400 transition-colors duration-200" 
                                />
                                <Label 
                                    htmlFor={option} 
                                    className="text-sm text-gray-700 dark:text-gray-200 cursor-pointer group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-200"
                                >
                                    {option}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>
            ))}
        </div>
    )
}

export default FilterCard