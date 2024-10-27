import React, { useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2, Mail, Lock, User } from 'lucide-react'
import { motion } from 'framer-motion'
import Navbar from '../shared/Navbar'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading,user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }
    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
            <Navbar />
            <div className="flex items-center justify-center pt-20 pb-16 px-4">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md"
                >
                    <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">Welcome Back</h1>
                    <form onSubmit={submitHandler} className="space-y-6">
                        <div>
                            <Label htmlFor="email" className="text-gray-700 dark:text-gray-300 font-semibold">Email</Label>
                            <div className="relative mt-1">
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={input.email}
                                    onChange={changeEventHandler}
                                    placeholder="you@example.com"
                                    className="pl-10 w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="password" className="text-gray-700 dark:text-gray-300 font-semibold">Password</Label>
                            <div className="relative mt-1">
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={input.password}
                                    onChange={changeEventHandler}
                                    placeholder="••••••••"
                                    className="pl-10 w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            </div>
                        </div>
                        <div className="flex items-center justify-between space-x-4">
                            <Label className="flex items-center space-x-2 cursor-pointer">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="text-indigo-600 focus:ring-indigo-500"
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300">Student</span>
                            </Label>
                            <Label className="flex items-center space-x-2 cursor-pointer">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="text-indigo-600 focus:ring-indigo-500"
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300">Recruiter</span>
                            </Label>
                        </div>
                        <Button 
                            type="submit" 
                            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Logging in...
                                </>
                            ) : (
                                'Login'
                            )}
                        </Button>
                    </form>
                    <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                        Don't have an account? 
                        <Link to="/signup" className="ml-1 font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">Sign up</Link>
                    </p>
                </motion.div>
            </div>
        </div>
    )
}

export default Login