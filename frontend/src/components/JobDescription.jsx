import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Navbar from './shared/Navbar';
import { motion } from 'framer-motion';
import { FaUniversity, FaClock, FaBook, FaArrowRight } from 'react-icons/fa';

const JobDescription = () => {
    const {singleJob} = useSelector(store => store.job);
    const {user} = useSelector(store=>store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);
    const [relatedCourses, setRelatedCourses] = useState([]);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials:true});
           
            if(res.data.success){
                setIsApplied(true); // Update the local state
                const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]}
                dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(()=>{
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id)) // Ensure the state is in sync with fetched data
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob();
    },[jobId,dispatch, user?._id]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                // Updated mock courses with only valid, viewable courses
                const mockCourses = [
                    {
                        id: 1,
                        title: "Machine Learning",
                        platform: "Coursera",
                        university: "Stanford University",
                        duration: "11 weeks",
                        level: "Intermediate",
                        image: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/b6/70d6201ab311e88083e53fe4f422ff/machine-learning-3.png?auto=format%2Ccompress&dpr=1&w=330&h=330&fit=fill&q=25",
                        url: "https://www.coursera.org/learn/machine-learning"
                    },
                    {
                        id: 2,
                        title: "The Web Developer Bootcamp",
                        platform: "Udemy",
                        instructor: "Colt Steele",
                        duration: "63.5 hours",
                        level: "Beginner to Advanced",
                        image: "https://img-c.udemycdn.com/course/240x135/625204_436a_3.jpg",
                        url: "https://www.udemy.com/course/the-web-developer-bootcamp/"
                    },
                    {
                        id: 3,
                        title: "Deep Learning Specialization",
                        platform: "Coursera",
                        university: "DeepLearning.AI",
                        duration: "5 months",
                        level: "Intermediate",
                        image: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/b6/70d6201ab311e88083e53fe4f422ff/machine-learning-3.png?auto=format%2Ccompress&dpr=1&w=330&h=330&fit=fill&q=25",
                        url: "https://www.coursera.org/specializations/deep-learning"
                    },
                    {
                        id: 4,
                        title: "React - The Complete Guide",
                        platform: "Udemy",
                        instructor: "Maximilian Schwarzmüller",
                        duration: "48 hours",
                        level: "All Levels",
                        image: "https://img-c.udemycdn.com/course/240x135/1362070_b9a1_2.jpg",
                        url: "https://www.udemy.com/course/react-the-complete-guide-incl-redux/"
                    },
                    {
                        id: 5,
                        title: "Python for Everybody Specialization",
                        platform: "Coursera",
                        university: "University of Michigan",
                        duration: "8 months",
                        level: "Beginner",
                        image: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/08/33f720502a11e59e72391aa537f5c9/pythonlearn_thumbnail_1x1.png?auto=format%2Ccompress&dpr=1&w=330&h=330&fit=fill&q=25",
                        url: "https://www.coursera.org/specializations/python"
                    },
                    {
                        id: 6,
                        title: "JavaScript: Understanding the Weird Parts",
                        platform: "Udemy",
                        instructor: "Anthony Alicea",
                        duration: "11.5 hours",
                        level: "Intermediate",
                        image: "https://img-c.udemycdn.com/course/240x135/364426_2991_6.jpg",
                        url: "https://www.udemy.com/course/understand-javascript/"
                    }
                ];

                // Filter courses based on job title
                const jobTitleWords = singleJob?.title.toLowerCase().split(' ');
                const related = mockCourses.filter(course => 
                    jobTitleWords.some(word => 
                        course.title.toLowerCase().includes(word) ||
                        course.platform.toLowerCase().includes(word) ||
                        (course.university && course.university.toLowerCase().includes(word))
                    )
                );

                // If no related courses found, use all courses
                const coursesToUse = related.length > 0 ? related : mockCourses;

                // Randomly select 4 courses
                const randomCourses = coursesToUse.sort(() => 0.5 - Math.random()).slice(0, 4);

                setRelatedCourses(randomCourses);
            } catch (error) {
                console.error('Error fetching courses:', error);
                setRelatedCourses([]);
            }
        };

        if (singleJob) {
            fetchCourses();
        }
    }, [singleJob]);

    return (
        <>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <div className='bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-xl'>
                    <div className='flex items-center justify-between mb-4'>
                        <div>
                            <h1 className='font-bold text-2xl text-gray-800 dark:text-white'>{singleJob?.title}</h1>
                            <div className='flex items-center gap-2 mt-2'>
                                <Badge className='bg-blue-100 text-[#0393D1] dark:bg-blue-900 dark:text-blue-200'>{singleJob?.postion} Positions</Badge>
                                <Badge className='bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'>{singleJob?.jobType}</Badge>
                                <Badge className='bg-[#0393D1] text-white dark:bg-[#0393D1] dark:text-white'>{singleJob?.salary}LPA</Badge>
                            </div>
                        </div>
                        <Button
                            onClick={isApplied ? null : applyJobHandler}
                            disabled={isApplied}
                            className={`
                                px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300
                                ${isApplied
                                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    : 'bg-[#0393D1] text-white hover:bg-[#0275a8] hover:shadow-md active:transform active:scale-95'
                                }
                            `}
                        >
                            {isApplied ? 'Already Applied' : 'Apply Now'}
                        </Button>
                    </div>
                    <div className='grid grid-cols-2 gap-4 my-4'>
                        <JobDetailItem label="Location" value={singleJob?.location} />
                        <JobDetailItem label="Experience" value={`${singleJob?.experienceLevel} yrs`} />
                        <JobDetailItem label="Salary" value={`${singleJob?.salary}LPA`} />
                        <JobDetailItem label="Total Applicants" value={singleJob?.applications?.length} />
                        <JobDetailItem label="Posted Date" value={singleJob?.createdAt.split("T")[0]} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">Description</h3>
                        <p className="text-gray-600 dark:text-gray-300">{singleJob?.description}</p>
                    </div>
                    
                    {relatedCourses.length > 0 && (
                        <div className='mt-10'>
                            <h2 className='text-2xl font-bold mb-6 text-gray-800 dark:text-white'>Related Courses</h2>
                            <motion.div 
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                {relatedCourses.map((course, index) => (
                                    <motion.div
                                        key={course.id}
                                        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                    >
                                        <div className="relative h-40">
                                            <img 
                                                src={course.image} 
                                                alt={course.title} 
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 text-xs font-bold rounded">
                                                {course.platform}
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white truncate">{course.title}</h3>
                                            <div className="text-sm text-gray-600 dark:text-gray-300 mb-2 truncate">
                                                {course.university || course.instructor}
                                            </div>
                                            <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                                                <span>{course.duration}</span>
                                                <span>{course.level}</span>
                                            </div>
                                            <a 
                                                href={course.url} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="mt-3 block text-center bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-300"
                                            >
                                                View Course
                                            </a>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

const JobDetailItem = ({ label, value }) => (
    <div>
        <p className="font-bold text-gray-700 dark:text-gray-300">{label}</p>
        <p className="text-gray-600 dark:text-gray-400">{value}</p>
    </div>
)

export default JobDescription