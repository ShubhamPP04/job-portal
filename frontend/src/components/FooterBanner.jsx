import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaApple, FaGooglePlay } from 'react-icons/fa';
import people from '@/assets/people.png';

const AnimatedNumber = ({ end, duration }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      setCount(Math.floor(end * percentage));
      if (percentage < 1) {
        requestAnimationFrame(animateCount);
      }
    };
    requestAnimationFrame(animateCount);
  }, [end, duration]);

  return <span>{count}</span>;
};

const StatCard = ({ number, label, suffix = '', delay, isDarkMode }) => (
  <motion.div
    className="text-center"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <div className={`text-2xl font-bold ${isDarkMode ? 'text-green-300' : 'text-green-800'}`}>
      <AnimatedNumber end={number} duration={2000} />
      {suffix}
    </div>
    <div className={`text-sm ${isDarkMode ? 'text-green-100' : 'text-green-700'}`}>{label}</div>
  </motion.div>
);

const ReferAndWinCard = ({ isDarkMode }) => (
  <motion.div
    className={`rounded-2xl border flex-1 transition-all duration-300 overflow-hidden ${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
    }`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    whileHover={{
      boxShadow: isDarkMode ? '0 10px 30px rgba(255, 255, 255, 0.1)' : '0 10px 30px rgba(0, 0, 0, 0.1)',
    }}
  >
    <motion.div
      className="relative w-full h-full"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <img
        src={people}
        className={`w-full h-full object-cover rounded-2xl ${isDarkMode ? 'brightness-75' : ''}`}
        alt="People"
      />
    </motion.div>
  </motion.div>
);

const FooterBanner = ({ isDarkMode }) => {
  return (
    <div
      className={`flex flex-col w-full max-w-6xl mx-auto p-4 space-y-4 dark:bg-transparent`}
    >
      <div
        className={`flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 ${
          isDarkMode ? 'text-white' : 'text-black'
        }`}
      >
        {/* Left Card: Download Career Hive App */}
        <motion.div
          className={`rounded-2xl border p-6 flex-1 transition-all duration-300 ${
            isDarkMode
              ? 'bg-gray-800 border-gray-700 hover:bg-gray-700'
              : 'bg-white border-gray-300 hover:bg-gray-100'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{
            boxShadow: isDarkMode ? '0 10px 30px rgba(255, 255, 255, 0.1)' : '0 10px 30px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
            App Coming Soon!!!
          </h2>
          <div className="flex space-x-4 mb-4">
            <FaApple className="w-8 h-8" />
            <FaGooglePlay className="w-8 h-8" />
          </div>
          <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Get the best career opportunities at your fingertips!
          </p>
        </motion.div>

        {/* Right Card: Full Image of People */}
        <ReferAndWinCard isDarkMode={isDarkMode} />
      </div>

      {/* Statistics Section */}
      <motion.div
        className={`rounded-2xl border p-6 transition-all duration-300 ${
          isDarkMode
            ? 'bg-gray-800 border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900 hover:bg-gray-700'
            : 'bg-white border-gray-300 bg-gradient-to-br from-white to-green-400 hover:bg-gray-100'
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        whileHover={{
          boxShadow: isDarkMode ? '0 10px 30px rgba(255, 255, 255, 0.1)' : '0 10px 30px rgba(0, 0, 0, 0.2)',
        }}
      >
        <h2 className={`text-2xl font-bold text-center mb-6 ${isDarkMode ? 'text-green-300' : 'text-green-800'}`}>
          Our Numbers
        </h2>
        <div
          className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 `}
        >
          <StatCard number={11} label="Active Users" suffix="M+" delay={0.7} isDarkMode={isDarkMode} />
          <StatCard number={22.3} label="Assessments" suffix="M+" delay={0.8} isDarkMode={isDarkMode} />
          <StatCard number={130} label="Opportunities" suffix="K+" delay={0.9} isDarkMode={isDarkMode} />
          <StatCard number={800} label="Brands trust us" suffix="+" delay={1.0} isDarkMode={isDarkMode} />
          <StatCard number={42} label="Organisations" suffix="K+" delay={1.1} isDarkMode={isDarkMode} />
          <StatCard number={78} label="Countries" suffix="+" delay={1.2} isDarkMode={isDarkMode} />
        </div>
      </motion.div>
    </div>
  );
};

export default FooterBanner;
