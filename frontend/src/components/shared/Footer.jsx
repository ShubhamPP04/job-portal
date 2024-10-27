import React from 'react';
import { motion } from 'framer-motion';
import { FaApple, FaGooglePlay, FaEnvelope } from 'react-icons/fa';
import logo from '@/assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <img src={logo} alt="Career Hive Logo" className="h-10 w-10 mr-2 rounded-full" />
              <h2 className="text-2xl font-bold">Career<span className="text-[#0393D1]">Hive</span></h2>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Empowering careers, connecting opportunities.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-400 hover:text-[#0393D1]" aria-label="Facebook">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.676 0H1.324C.593 0 0 .592 0 1.324v21.352C0 23.408.593 24 1.324 24H12.82V14.706H9.692v-3.578h3.128V8.408c0-3.1 1.893-4.787 4.657-4.787 1.325 0 2.463.1 2.794.144v3.238l-1.918.001c-1.503 0-1.794.715-1.794 1.762v2.31h3.587l-.468 3.578h-3.119V24h6.116C23.407 24 24 23.408 24 22.676V1.324C24 .592 23.407 0 22.676 0z" /></svg>
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-[#0393D1]" aria-label="Twitter">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.835 9.835 0 01-2.828.775 4.934 4.934 0 002.165-2.724 9.867 9.867 0 01-3.127 1.195 4.924 4.924 0 00-8.38 4.49A13.978 13.978 0 011.67 3.149 4.93 4.93 0 003.16 9.724a4.903 4.903 0 01-2.229-.616v.062a4.93 4.93 0 003.946 4.827 4.902 4.902 0 01-2.224.084 4.93 4.93 0 004.6 3.417A9.869 9.869 0 010 21.543a13.978 13.978 0 007.548 2.212c9.057 0 14.01-7.507 14.01-14.01 0-.213-.004-.425-.015-.636A10.012 10.012 0 0024 4.557z" /></svg>
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-[#0393D1]" aria-label="LinkedIn">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452H16.85v-5.569c0-1.327-.027-3.037-1.852-3.037-1.854 0-2.137 1.446-2.137 2.94v5.666H9.147V9.756h3.448v1.464h.05c.48-.91 1.653-1.871 3.401-1.871 3.634 0 4.307 2.39 4.307 5.498v5.605zM5.337 8.29c-1.105 0-2-.896-2-2 0-1.106.895-2 2-2 1.104 0 2 .895 2 2 0 1.104-.896 2-2 2zM7.119 20.452H3.553V9.756h3.566v10.696zM22.225 0H1.771C.791 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451c.979 0 1.771-.774 1.771-1.729V1.729C24 .774 23.205 0 22.225 0z" /></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-600 dark:text-gray-400 hover:text-[#0393D1]">Home</a></li>
              <li><a href="/jobs" className="text-gray-600 dark:text-gray-400 hover:text-[#0393D1]">Jobs</a></li>
              <li><a href="/browse" className="text-gray-600 dark:text-gray-400 hover:text-[#0393D1]">Browse</a></li>
              <li><a href="/generate-resume" className="text-gray-600 dark:text-gray-400 hover:text-[#0393D1]">Generate Resume</a></li>
            </ul>
          </div>

          {/* Download App and Mail Me */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Get the best career opportunities at your fingertips!
            </p>
            <div className="flex space-x-4 mb-4">
              <a href="https://kipflix.xyz/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0393D1]" aria-label="App Store">
                <FaApple className="w-8 h-8" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#0393D1]" aria-label="Google Play">
                <FaGooglePlay className="w-8 h-8" />
              </a>
            </div>
            <motion.a
              href="mailto:carrerhive24@gmail.com"
              className="inline-flex items-center px-4 py-2 bg-[#0393D1] text-white rounded-md transition-colors duration-300"
              whileHover={{
                scale: 1.05,
                backgroundColor: "#0377A8",
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 10
              }}
            >
              <FaEnvelope className="mr-2" />
              Mail Us
            </motion.a>
          </motion.div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} CareerHive. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;