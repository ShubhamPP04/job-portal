import React from 'react';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import { motion } from 'framer-motion';

const categories = [
  { title: 'Frontend Developer', rating: 4.0 },
  { title: 'Backend Developer', rating: 4.5 },
  { title: 'Design & Creative', rating: 4.9},
  { title: 'Sales & Marketing', rating: 4.7 },
  { title: 'Writing & Translation', rating: 4.5 },
  { title: 'AI & ML', rating: 4.2 },
  { title: 'Finance & Accounting', rating: 4.7 },
  { title: 'Engineering', rating: 4.8 },
  { title: 'Block Chain', rating: 4.8},
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="mx-4 md:mx-8 lg:mx-16 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <div className="text-center mb-12 pt-8">
        <h2 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">Browse by Jobs</h2>
        <h3 className="text-2xl font-semibold text-gray-600 dark:text-gray-400">Explore Categories</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white-100 dark:bg-gray-800 rounded-lg shadow-md p-8 flex flex-col items-center justify-center hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700"
          >
            <div className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{category.title}</div>
            <div className="flex items-center mb-6">
              <span className="text-green-600 dark:text-green-400 mr-2">{category.rating}/5</span>
              
            </div>
            <Button
              onClick={() => searchJobHandler(category.title)}
              variant="outline"
              className="rounded-full px-6 py-3 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            >
            Browse Jobs
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCarousel;