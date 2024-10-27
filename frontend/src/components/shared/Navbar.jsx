import React, { useState, useEffect } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2, Moon, Sun, FileText, Bookmark, Menu, X, BookOpen } from 'lucide-react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import logo from '@/assets/logo.png'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark');
        localStorage.setItem('darkMode', !isDarkMode);
    };

    useEffect(() => {
        const storedDarkMode = localStorage.getItem('darkMode');
        if (storedDarkMode) {
            setIsDarkMode(JSON.parse(storedDarkMode));
            if (JSON.parse(storedDarkMode)) {
                document.body.classList.add('dark');
            }
        }
    }, []);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    const getNavLinkClass = (path) => {
        const isActive = location.pathname === path;
        return `px-3 py-2 rounded-full transition-all duration-300 ${
            isActive 
                ? 'bg-[#0393D1] text-white' 
                : `hover:bg-[#0393D1] hover:text-white ${isDarkMode ? 'text-white' : 'text-black'}`
        }`;
    };

    const NavLinks = () => (
        <>
            {user && user.role === 'recruiter' ? (
                <>
                    <li><Link to="/admin/companies" className={getNavLinkClass("/admin/companies")}>Companies</Link></li>
                    <li><Link to="/admin/jobs" className={getNavLinkClass("/admin/jobs")}>Jobs</Link></li>
                </>
            ) : (
                <>
                    <li><Link to="/" className={getNavLinkClass("/")}>Home</Link></li>
                    <li><Link to="/jobs" className={getNavLinkClass("/jobs")}>Jobs</Link></li>
                    <li><Link to="/browse" className={getNavLinkClass("/browse")}>Browse</Link></li>
                    <li><Link to="/courses" className={getNavLinkClass("/courses")}>Courses</Link></li>
                </>
            )}
        </>
    )

    return (
        <div className={`sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-sm transition-all duration-300`}>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4'>
                <div className='hover:animate-pulse flex items-center'>
                    <img src={logo} alt="logo" className='h-14 w-14 mr-2 rounded-full'/>
                    <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Career<span className='text-[#0393D1]'>Hive</span></h1>
                </div>
                <div className='hidden md:flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        <NavLinks />
                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login"><Button variant="outline">Login</Button></Link>
                                <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className=''>
                                        <div className='flex gap-2 space-y-2'>
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                            </Avatar>
                                            <div>
                                                <h4 className='font-medium'>{user?.fullname}</h4>
                                                <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col my-2 text-gray-600'>
                                            {
                                                user && user.role === 'student' && (
                                                    <>
                                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                            <User2 />
                                                            <Button variant="link"> <Link to="/profile">View Profile</Link></Button>
                                                        </div>
                                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                            <FileText />
                                                            <Button variant="link"> <Link to="/generate-resume">Generate Resume</Link></Button>
                                                        </div>
                                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                            <Bookmark />
                                                            <Button variant="link"> <Link to="/bookmarks">Bookmarked Jobs</Link></Button>
                                                        </div>
                                                    </>
                                                )
                                            }
                                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                <LogOut />
                                                <Button onClick={logoutHandler} variant="link">Logout</Button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                    <Button onClick={toggleDarkMode} variant="outline" className="rounded-full">
                        {isDarkMode ? <Sun className='h-5 w-5' /> : <Moon className='h-5 w-5' />}
                    </Button>
                </div>
                <div className='md:hidden'>
                    <Button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)} 
                        variant="ghost"
                        className="transition-transform duration-300 ease-in-out"
                        style={{ transform: isMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    >
                        {isMenuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
                    </Button>
                </div>
            </div>
            <div 
                className={`md:hidden bg-white dark:bg-gray-800 overflow-hidden transition-all duration-300 ease-in-out ${
                    isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <div className='py-4 px-4'>
                    <ul className='flex flex-col items-start gap-4'>
                        <NavLinks />
                    </ul>
                    {!user ? (
                        <div className='flex flex-col items-start gap-2 mt-4'>
                            <Link to="/login"><Button variant="outline" className="w-full">Login</Button></Link>
                            <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6] w-full">Signup</Button></Link>
                        </div>
                    ) : (
                        <div className='flex flex-col items-start gap-2 mt-4'>
                            {user.role === 'student' && (
                                <>
                                    <Link to="/profile" className="flex items-center gap-2">
                                        <User2 size={18} />
                                        <span>View Profile</span>
                                    </Link>
                                    <Link to="/generate-resume" className="flex items-center gap-2">
                                        <FileText size={18} />
                                        <span>Generate Resume</span>
                                    </Link>
                                    <Link to="/bookmarks" className="flex items-center gap-2">
                                        <Bookmark size={18} />
                                        <span>Bookmarked Jobs</span>
                                    </Link>
                                </>
                            )}
                            <Button onClick={logoutHandler} variant="link" className="flex items-center gap-2 p-0">
                                <LogOut size={18} />
                                <span>Logout</span>
                            </Button>
                        </div>
                    )}
                    <div className='mt-4'>
                        <Button onClick={toggleDarkMode} variant="outline" className="rounded-full w-full">
                            {isDarkMode ? <Sun className='h-5 w-5 mr-2' /> : <Moon className='h-5 w-5 mr-2' />}
                            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar