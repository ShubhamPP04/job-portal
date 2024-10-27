import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen, Briefcase, FileText } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import { motion } from 'framer-motion'

// const skills = ["Html", "Css", "Javascript", "Reactjs"]
const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);
    const isDarkMode = localStorage.getItem('darkMode') === 'true';

    return (
        <div className={`bg-background dark:bg-black min-h-screen`}>
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`bg-card dark:bg-card border border-border dark:border-border rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden`}
                >
                    <div className="px-8 py-8">
                        <div className='flex justify-between items-center mb-6'>
                            <div className='flex items-center gap-6'>
                                <motion.div 
                                    whileHover={{ scale: 1.05 }} 
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="ring-4 ring-background dark:ring-black rounded-full"
                                >
                                    <Avatar className="h-24 w-24 border-4 border-white dark:border-gray-800">
                                        <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" alt="profile" />
                                    </Avatar>
                                </motion.div>
                                <div>
                                    <h1 className={`font-bold text-2xl dark:text-white mb-1`}>{user?.fullname}</h1>
                                    <p className={`text-muted-foreground dark:text-gray-300 text-base`}>{user?.profile?.bio || "No bio available"}</p>
                                </div>
                            </div>
                            <Button
                                onClick={() => setOpen(true)}
                                className="text-right bg-white bg-primary hover:bg-primary-dark text-white dark:bg-black transition-colors duration-300"
                                size="lg"
                            >
                                <Pen className="mr-2 h-5 w-5" /> Edit Profile
                            </Button>
                        </div>
                        
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-8'>
                            <div>
                                <h2 className={`font-semibold text-xl dark:text-white mb-4`}>Contact Information</h2>
                                <motion.div
                                    className='flex items-center gap-3 my-3 p-3 rounded-lg bg-background dark:bg-gray-800 hover:bg-accent/10 transition-colors duration-200'
                                    whileHover={{ x: 5 }}
                                >
                                    <Mail className="text-primary h-5 w-5" />
                                    <span className={`text-foreground dark:text-gray-300`}>{user?.email}</span>
                                </motion.div>
                                <motion.div
                                    className='flex items-center gap-3 my-3 p-3 rounded-lg bg-background dark:bg-gray-800 hover:bg-accent/10 transition-colors duration-200'
                                    whileHover={{ x: 5 }}
                                >
                                    <Contact className="text-primary h-5 w-5" />
                                    <span className={`text-foreground dark:text-gray-300`}>{user?.phoneNumber || "No phone number available"}</span>
                                </motion.div>
                            </div>
                            
                            <div>
                                <h2 className={`font-semibold text-xl dark:text-white mb-4`}>Skills</h2>
                                <div className='flex items-center gap-2 flex-wrap'>
                                    {
                                        user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => (
                                            <motion.div 
                                                key={index} 
                                                whileHover={{ 
                                                    scale: 1.05,
                                                    backgroundColor: "#0393D1",
                                                    color: "var(--primary-foreground)"
                                                }} 
                                                whileTap={{ scale: 0.95 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <Badge className={`
                                                    bg-accent dark:bg-accent 
                                                    text-accent-foreground dark:text-accent-foreground 
                                                    px-3 py-1.5 text-sm font-medium
                                                    transition-all duration-200 ease-in-out
                                                    hover:bg-[#0393D1] hover:text-primary-foreground
                                                `}>
                                                    {item}
                                                </Badge>
                                            </motion.div>
                                        )) : <span className={`text-muted-foreground dark:text-gray-300`}>No skills listed</span>
                                    }
                                </div>
                            </div>
                        </div>
                        
                        <div className='mt-8'>
                            <h2 className={`font-semibold text-xl dark:text-white mb-4`}>Resume</h2>
                            {
                                isResume ? (
                                    <motion.a
                                        whileHover={{ scale: 1.02 }}
                                        target='blank'
                                        href={user?.profile?.resume}
                                        className={`inline-flex items-center gap-2 text-primary hover:text-primary-dark dark:hover:text-primary-light cursor-pointer transition-colors duration-300`}
                                    >
                                        <FileText className="h-5 w-5" />
                                        {user?.profile?.resumeOriginalName}
                                    </motion.a>
                                ) : <span className={`text-muted-foreground ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>No resume uploaded</span>
                            }
                        </div>
                    </div>
                </motion.div>
                
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className={`bg-card dark:bg-card rounded-3xl p-8 shadow-xl mt-8`}
                >
                    <h2 className={`font-bold text-2xl mb-6 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                        <Briefcase className="h-6 w-6 text-primary" />
                        Applied Jobs
                    </h2>
                    <AppliedJobTable />
                </motion.div>
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile