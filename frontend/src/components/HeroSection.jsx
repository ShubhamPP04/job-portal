import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './HeroSection.css';
import { useTheme } from 'next-themes';

// Custom arrow components
const NextArrow = (props) => {
    const { onClick } = props;
    return (
        <div
            className="absolute top-[50%] right-[-30px] transform -translate-y-[50%] cursor-pointer z-10"
            onClick={onClick}
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400 hover:text-gray-600 transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
            </svg>
        </div>
    );
};

const PrevArrow = (props) => {
    const { onClick } = props;
    return (
        <div
            className="absolute top-[50%] left-[-30px] transform -translate-y-[50%] cursor-pointer z-10"
            onClick={onClick}
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400 hover:text-gray-600 transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6"/>
            </svg>
        </div>
    );
};

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { theme } = useTheme();

    const searchJobHandler = (searchTerm = query) => {
        if (searchTerm.trim()) {
            dispatch(setSearchedQuery(searchTerm.trim()));
            navigate("/browse");
        }
    }

    const handlePopularSearch = (term) => {
        setQuery(term);
        searchJobHandler(term);
    }

    // Updated carousel settings
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        accessibility: true,
        appendDots: dots => (
            <div style={{ bottom: "10px" }}>
                <ul style={{ margin: "0px" }}> {dots} </ul>
            </div>
        ),
        dotsClass: "slick-dots custom-dot-class",
    };

    // Image sources for the horizontal scroll
    const scrollImages = [
        "https://d8it4huxumps7.cloudfront.net/images/home-page-banner/66bc577aa0411_Unstop_homepage_banner_TIC_-_register_now__1_.png?d=1190x465",
        "https://d8it4huxumps7.cloudfront.net/images/home-page-banner/66a8e6590d2da_Rotating__1_.jpg?d=1190x465",
        "https://d8it4huxumps7.cloudfront.net/images/home-page-banner/66b3a0bd6bc08_Homepage__2___1_.jpg?d=1190x465",
        "https://d8it4huxumps7.cloudfront.net/images/home-page-banner/66aa04317d433_lime_landing_page-4__1___1_.png?d=1190x465",
         "https://d8it4huxumps7.cloudfront.net/images/home-page-banner/66b3a0bd6bc08_Homepage__2___1_.jpg?d=1190x465"
    ];

    const isDarkMode = theme === 'dark';

    return (
        <div className={`text-center py-12 dark:bg-transparent`}>
            <div className='container mx-auto px-4'>
                <span className={`inline-block px-4 py-2 rounded-full font-medium mb-6 animate-pulse ${isDarkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-600'}`}>
                    UNLOCK YOUR CAREER WITH CAREER HIVE
                </span>
                <h1 className={`text-5xl font-bold mb-8 dark:text-white`}>
                    Search, Apply & <br /> 
                    Get Your <span className='text-[#0393D1] relative'>
                        Dream Jobs
                        <svg className="absolute w-full h-3 -bottom-2 left-0" viewBox="0 0 200 9" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#0393D1" d="M0,8.7c0,0,203.7-24.5,200,0"/>
                        </svg>
                    </span>
                </h1>
                
                {/* Slightly Smaller Image Carousel */}
                <Slider {...settings} className="w-full lg:w-[70%] mx-auto relative mb-12">
                    {scrollImages.map((src, index) => (
                        <div key={index} className="group">
                            <div className="h-[250px] lg:h-[350px] overflow-hidden rounded-lg">
                                <img 
                                    src={src} 
                                    alt={`Career Image ${index + 1}`} 
                                    className='w-full h-full object-cover transition-transform duration-500 ease-in-out transform group-hover:scale-105'
                                />
                            </div>
                        </div>
                    ))}
                </Slider>
                
                {/* Improved Search Bar with Icon */}
                <div className='w-full lg:w-[60%] mx-auto mb-12'>
                    <div className={`flex items-center shadow-lg rounded-full overflow-hidden transition-all duration-300 hover:shadow-xl ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                        <div className="flex-grow flex items-center">
                            <Search className={`h-5 w-5 ml-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                            <input
                                type="text"
                                placeholder='Find your dream job'
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && searchJobHandler()}
                                className={`flex-grow px-4 py-4 text-lg outline-none ${isDarkMode ? 'bg-gray-800 text-white placeholder-gray-400' : 'bg-white text-black placeholder-gray-500'}`}
                            />
                        </div>
                        <div className="pr-2">
                            <Button 
                                onClick={() => searchJobHandler()} 
                                className="bg-[#0393D1] hover:bg-[#0377A8] text-white p-3 rounded-full transition duration-300 ease-in-out flex items-center justify-center"
                            >
                                <Search className="h-6 w-6" />
                            </Button>
                        </div>
                    </div>
                    <p className={`text-sm mt-4 font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Popular searches: 
                        {['Software Engineer', 'Data Analyst', 'Marketing Manager'].map((term, index) => (
                            <span 
                                key={index}
                                onClick={() => handlePopularSearch(term)}
                                className={`hover:underline cursor-pointer ml-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}
                            >
                                {term}
                            </span>
                        ))}
                    </p>
                </div>

                {/* Infinite Scrolling Images */}
                <div className='scrolling-images-container'>
                    <div className='scrolling-images'>
                        {scrollImages.concat(scrollImages).map((src, index) => (
                            <img 
                                key={index} 
                                src={src} 
                                alt={`Scrolling Image ${index + 1}`} 
                                className='scrolling-image'
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection;