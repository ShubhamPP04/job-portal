import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './shared/Navbar';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBook, FaClock, FaUniversity, FaSearch } from 'react-icons/fa';
import { Plus } from 'lucide-react';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [visibleCourses, setVisibleCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [coursesPerPage, setCoursesPerPage] = useState(8);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://api.example.com/ocw-courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
        const mockCourses = [
          {
            id: 1,
            title: "Introduction to Computer Science",
            university: "MIT",
            duration: "9 weeks",
            level: "Undergraduate",
            image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            url: "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/"
          },
          {
            id: 2,
            title: "Linear Algebra",
            university: "MIT",
            duration: "12 weeks",
            level: "Undergraduate",
            image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            url: "https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/"
          },
          {
            id: 3,
            title: "Introduction to Algorithms",
            university: "MIT",
            duration: "14 weeks",
            level: "Undergraduate",
            image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/"
          },
          {
            id: 4,
            title: "Artificial Intelligence",
            university: "MIT",
            duration: "15 weeks",
            level: "Graduate",
            image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            url: "https://ocw.mit.edu/courses/6-034-artificial-intelligence-fall-2010/"
          },
          {
            id: 5,
            title: "Machine Learning",
            university: "Stanford",
            duration: "11 weeks",
            level: "Graduate",
            image: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            url: "https://www.coursera.org/learn/machine-learning"
          },
          {
            id: 6,
            title: "Data Structures",
            university: "UC Berkeley",
            duration: "16 weeks",
            level: "Undergraduate",
            image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            url: "https://cs61b.brantley.ai/"
          },
          {
            id: 7,
            title: "Web Development",
            university: "Harvard",
            duration: "12 weeks",
            level: "Undergraduate",
            image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            url: "https://cs50.harvard.edu/web/2020/"
          },
          {
            id: 8,
            title: "Cybersecurity Fundamentals",
            university: "NYU",
            duration: "10 weeks",
            level: "Undergraduate",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            url: "https://engineering.nyu.edu/academics/programs/cybersecurity-ms-online"
          },
          {
            id: 9,
            title: "Deep Learning",
            university: "Stanford",
            duration: "16 weeks",
            level: "Graduate",
            image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            url: "https://www.coursera.org/specializations/deep-learning"
          },
          {
            id: 10,
            title: "Operating Systems",
            university: "UC Berkeley",
            duration: "15 weeks",
            level: "Undergraduate",
            image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            url: "https://cs162.org/"
          },
          {
            id: 11,
            title: "Introduction to Data Science",
            university: "MIT",
            duration: "12 weeks",
            level: "Undergraduate",
            image: "https://images.unsplash.com/photo-1528716321680-815a8cdbccc2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            url: "https://ocw.mit.edu/courses/18-650-statistics-for-applications-fall-2016/"
          },
          {
            id: 12,
            title: "Computer Vision",
            university: "Stanford",
            duration: "10 weeks",
            level: "Graduate",
            image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            url: "https://www.coursera.org/specializations/computer-vision"
          },
          {
            id: 13,
            title: "Natural Language Processing",
            university: "Stanford",
            duration: "10 weeks",
            level: "Graduate",
            image: "https://images.unsplash.com/photo-1554475901-4f87821a4b72?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            url: "https://www.coursera.org/specializations/natural-language-processing"
          },
          {
            id: 14,
            title: "Reinforcement Learning",
            university: "DeepMind",
            duration: "10 weeks",
            level: "Graduate",
            image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            url: "https://www.coursera.org/specializations/reinforcement-learning"
          },
          {
            id: 15,
            title: "Introduction to Game Development",
            university: "UC Berkeley",
            duration: "12 weeks",
            level: "Undergraduate",
            image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            url: "https://cs188.org/"
          },
          {
            id: 16,
            title: "Introduction to Robotics",
            university: "Stanford",
            duration: "12 weeks",
            level: "Undergraduate",
            image: "https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            url: "https://www.coursera.org/learn/robotics-introduction"
          },
          {
            id: 17,
            title: "Introduction to Quantum Computing",
            university: "MIT",
            duration: "12 weeks",
            level: "Undergraduate",
            image: "https://images.unsplash.com/photo-1553481187-be93c21490a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            url: "https://ocw.mit.edu/courses/8-051-principles-of-computer-science-i-fall-2016/"
          },
          {
            id: 18,
            title: "Introduction to Cryptography",
            university: "Stanford",
            duration: "12 weeks",
            level: "Undergraduate",
            image: "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            url: "https://www.coursera.org/learn/crypto"
          },
          {
            id: 19,
            title: "Introduction to Bioinformatics",
            university: "Harvard",
            duration: "12 weeks",
            level: "Undergraduate",
            image: "https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            url: "https://bioinformatics.fas.harvard.edu/cs229-spring-2018/"
          },
          {
            id: 20,
            title: "Introduction to Astronomy",
            university: "Cornell",
            duration: "12 weeks",
            level: "Undergraduate",
            image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            url: "https://www.coursera.org/learn/astronomy"
          },
          {
            id: 21,
            title: "Introduction to Economics",
            university: "MIT",
            duration: "12 weeks",
            level: "Undergraduate",
            image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            url: "https://ocw.mit.edu/courses/14-01-principles-of-microeconomics-fall-2017/"
          },
          {
            id: 22,
            title: "Introduction to Psychology",
            university: "Stanford",
            duration: "12 weeks",
            level: "Undergraduate",
            image: "https://images.unsplash.com/photo-1554244931-4f87821a4b72?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            url: "https://www.coursera.org/learn/psychology"
          },
          {
            id: 23,
            title: "Introduction to Sociology",
            university: "Harvard",
            duration: "12 weeks",
            level: "Undergraduate",
            image: "https://images.unsplash.com/photo-1520824042837-2560ef05bf9b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            url: "https://www.extension.harvard.edu/open-learning-initiative/sociology"
          },
          {
            id: 24,
            title: "Introduction to Anthropology",
            university: "UC Berkeley",
            duration: "12 weeks",
            level: "Undergraduate",
            image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            url: "https://anthro.berkeley.edu/academics/undergraduate/courses/introduction-to-anthropology"
          },
          {
            id: 25,
            title: "Introduction to Philosophy",
            university: "Stanford",
            duration: "12 weeks",
            level: "Undergraduate",
            image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            url: "https://www.coursera.org/learn/philosophy"
          },
          {
            id: 26,
            title: "Introduction to Music",
            university: "Berkeley",
            duration: "12 weeks",
            level: "Undergraduate",
            image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            url: "https://music.berkeley.edu/academics/undergraduate/courses/music-1"
          },
          {
            id: 27,
            title: "Introduction to Art History",
            university: "Yale",
            duration: "12 weeks",
            level: "Undergraduate",
            image: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            url: "https://oyc.yale.edu/art-history/ah-101"
          },
          {
            id: 28,
            title: "Introduction to Film Studies",
            university: "UC Santa Cruz",
            duration: "12 weeks",
            level: "Undergraduate",
            image: "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            url: "https://www.ucsc.edu/courses/film-tv/film-101.html"
          },
          {
            id: 29,
            title: "Introduction to Linguistics",
            university: "MIT",
            duration: "12 weeks",
            level: "Undergraduate",
            image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            url: "https://ocw.mit.edu/courses/24-997-introduction-to-linguistics-spring-2015/"
          },
          {
            id: 30,
            title: "Introduction to Political Science",
            university: "Stanford",
            duration: "12 weeks",
            level: "Undergraduate",
            image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            url: "https://www.coursera.org/learn/political-science"
          }
        ];
        setCourses(mockCourses);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const filteredCourses = courses.filter(course =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.university.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setVisibleCourses(filteredCourses.slice(0, coursesPerPage));
  }, [courses, coursesPerPage, searchTerm]);

  const handleEnroll = (url) => {
    window.open(url, '_blank');
  };

  const handleViewMore = () => {
    setCoursesPerPage(prevCount => prevCount + 8);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCoursesPerPage(8); // Reset to initial page when searching
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  const titleText = "Explore Courses in Various Fields";

  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-6 sm:py-12">
        <motion.h1 
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6 md:mb-8 text-center leading-tight"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          {titleText.split("").map((letter, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              style={{ display: 'inline-block' }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.h1>
        
        <motion.div 
          className="relative w-full max-w-md mx-auto mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {visibleCourses.map((course) => (
                <motion.div
                  key={course.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden transition duration-300 hover:shadow-lg"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="relative">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-40 sm:h-48 object-cover"
                    />
                    <Button 
                      onClick={() => handleEnroll(course.url)} 
                      className="absolute -bottom-4 right-4 rounded-full p-0 w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 hover:bg-blue-600 text-white shadow-md transition duration-300 transform hover:scale-110"
                    >
                      <Plus size={16} className="sm:hidden" />
                      <Plus size={20} className="hidden sm:inline" />
                    </Button>
                  </div>
                  <div className="p-4 sm:p-6">
                    <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-800 dark:text-white line-clamp-2">{course.title}</h2>
                    <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center">
                        <FaUniversity className="mr-2 text-blue-500" />
                        <span className="truncate">{course.university}</span>
                      </div>
                      <div className="flex items-center">
                        <FaClock className="mr-2 text-blue-500" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <FaBook className="mr-2 text-blue-500" />
                        <span>{course.level}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            {visibleCourses.length < courses.filter(course =>
              course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              course.university.toLowerCase().includes(searchTerm.toLowerCase())
            ).length && (
              <motion.div 
                className="flex justify-center mt-8 sm:mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Button 
                  onClick={handleViewMore} 
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 sm:px-6 rounded-full transition duration-300 text-sm"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  View More
                </Button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Courses;
