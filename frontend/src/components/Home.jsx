import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import FooterBanner from './FooterBanner'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// Import logo images
import logo1 from '../assets/1.webp'
import logo2 from '../assets/2.webp'
import logo3 from '../assets/3.webp'
import logo4 from '../assets/4.webp'
import logo5 from '../assets/5.webp'
import logo6 from '../assets/6.webp'

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, []);

  const brandLogos = [logo1, logo2, logo3, logo4, logo5, logo6];

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <div className="max-w-7xl mx-auto my-12 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Industry Veterans Trust Us</h2>
        <div className="scrolling-logos-container overflow-hidden">
          <div className="scrolling-logos flex animate-scroll">
            {brandLogos.concat(brandLogos).map((logo, index) => (
              <div 
                key={index} 
                className="scrolling-logo bg-white dark:bg-transparent rounded-lg flex items-center justify-center p-2 mx-2"
              >
                <img src={logo} alt={`Brand logo ${index + 1}`} className="h-12 md:h-20 w-auto object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <LatestJobs />
      <FooterBanner />
      <Footer />
    </div>
  )
}

export default Home