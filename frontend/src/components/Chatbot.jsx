import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, User, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const predefinedQuestions = [
  {
    question: "What is CareerHive?",
    answer: "CareerHive is a job search platform that helps you find and apply for jobs, create resumes, and access career development courses."
  },
  {
    question: "How do I search for jobs?",
    answer: "Use the search bar on the homepage or browse job listings. You can filter by location, job type, and salary range."
  },
  {
    question: "Can I create a resume?",
    answer: "Yes, CareerHive offers a resume generation feature. Access it from the 'Generate Resume' link in the navigation menu."
  },
  {
    question: "How do I apply for a job?",
    answer: "Click on a job listing, review the details, and click the 'Apply Now' button on the job description page."
  },
  {
    question: "Are there any courses available?",
    answer: "Yes, CareerHive offers various career development courses. Find them in the 'Courses' section."
  },
  {
    question: "How do I bookmark a job?",
    answer: "Click the bookmark icon on a job listing to save it. View your bookmarks in your profile."
  },
  {
    question: "Is there a mobile app?",
    answer: "We're currently developing mobile apps for iOS and Android. They'll be available soon!"
  },
  {
    question: "How do I update my profile?",
    answer: "Go to your profile page and click the 'Edit Profile' button to update your information."
  },
  {
    question: "What types of jobs are available?",
    answer: "CareerHive offers a wide range of jobs including software development, data analysis, marketing, finance, and more."
  },
  {
    question: "How can I contact support?",
    answer: "You can reach our support team at careerhive24@gmail.com for any assistance."
  },
];

const keywordResponses = [
  {
    keywords: ['resume', 'cv'],
    response: "CareerHive offers a resume generation feature. You can access it from the 'Generate Resume' link in the navigation menu. It helps you create a professional resume tailored to your skills and experience.",
    action: { text: "Generate Resume", link: "/generate-resume" }
  },
  {
    keywords: ['apply', 'application'],
    response: "To apply for a job on CareerHive, first find a job you're interested in, then click on the job listing to view more details. On the job description page, you'll find an 'Apply Now' button. Click it to submit your application.",
    action: { text: "Browse Jobs", link: "/jobs" }
  },
  {
    keywords: ['course', 'learn', 'study'],
    response: "CareerHive offers various career development courses. You can find them by clicking on the 'Courses' link in the navigation menu. These courses cover a wide range of topics to help you enhance your skills and advance your career.",
    action: { text: "View Courses", link: "/courses" }
  },
  {
    keywords: ['search', 'find', 'look for'],
    response: "To search for jobs on CareerHive, use the search bar on the homepage or go to the 'Browse' section. You can filter jobs by location, job type, and salary range to find the perfect opportunity for you.",
    action: { text: "Search Jobs", link: "/jobs" }
  },
  {
    keywords: ['profile', 'account'],
    response: "You can manage your profile by clicking on your avatar in the top right corner, then selecting 'View Profile'. On your profile page, you'll find an 'Edit Profile' button to update your information.",
    action: { text: "View Profile", link: "/profile" }
  },
  {
    keywords: ['bookmark', 'save'],
    response: "To bookmark a job, click the bookmark icon on a job listing. You can view all your bookmarked jobs in your profile under the 'Bookmarks' section.",
    action: { text: "View Bookmarks", link: "/bookmarks" }
  },
  {
    keywords: ['contact', 'support', 'help'],
    response: "For any assistance, you can reach our support team at careerhive24@gmail.com. We're always here to help with any questions or issues you might have.",
    action: { text: "Contact Support", link: "/support" }
  },
  {
    keywords: ['mobile', 'app', 'phone'],
    response: "We're currently developing mobile apps for both iOS and Android. They'll be available soon, offering you the full CareerHive experience on your mobile device!",
    action: { text: "Stay Updated", link: "/notifications" }
  },
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showQuestions, setShowQuestions] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const resetChat = () => {
    setMessages([]);
    setShowQuestions(false);
    addMessage("Welcome to CareerHive! I'm here to help you with any questions you might have about our platform.", 'bot');
    addMessage("To get started, you can ask me anything or choose from some common questions below:", 'bot');
    setShowQuestions(true);
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      resetChat();
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      addMessage(input, 'user');
      setInput('');
      handleUserInput(input);
    }
  };

  const addMessage = (text, sender, action = null) => {
    setMessages(prevMessages => [...prevMessages, { text, sender, action }]);
  };

  const handleUserInput = (input) => {
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes('help') || lowerInput.includes('question')) {
      addMessage("Sure, I'd be happy to help! Here are some questions you can ask:", 'bot');
      setShowQuestions(true);
    } else {
      const matchedQuestion = predefinedQuestions.find(q => 
        lowerInput.includes(q.question.toLowerCase())
      );
      if (matchedQuestion) {
        addMessage(matchedQuestion.answer, 'bot', matchedQuestion.action);
      } else {
        const matchedKeyword = keywordResponses.find(kr => 
          kr.keywords.some(keyword => lowerInput.includes(keyword))
        );
        if (matchedKeyword) {
          addMessage(matchedKeyword.response, 'bot', matchedKeyword.action);
        } else {
          addMessage("I'm sorry, I don't have a specific answer for that. Is there anything else I can help you with regarding job searching, resume building, or career development?", 'bot');
        }
      }
      setShowQuestions(true);
    }
  };

  const handleQuestionClick = (question) => {
    addMessage(question.question, 'user');
    setShowQuestions(false);
    addMessage(question.answer, 'bot');
    setTimeout(() => setShowQuestions(true), 1000);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-96 mb-4 overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 flex justify-between items-center">
              <div className="flex items-center">
                <Bot className="h-8 w-8 text-white mr-3 bg-white/20 p-1.5 rounded-full" />
                <h3 className="text-xl font-bold text-white">Pluto Assistant 😎</h3>
              </div>
              <div className="flex items-center">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={resetChat} 
                  className="text-white hover:bg-white/20 rounded-full p-2 transition-colors duration-200 mr-2"
                  title="Reset Chat"
                >
                  <RefreshCw className="h-5 w-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={toggleChat} 
                  className="text-white hover:bg-white/20 rounded-full p-2 transition-colors duration-200"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
            </div>
            <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex flex-col items-${message.sender === 'user' ? 'end' : 'start'} space-y-2 max-w-[80%]`}>
                    <div className={`flex items-end space-x-2 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div className={`rounded-full p-2 ${message.sender === 'user' ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'}`}>
                        {message.sender === 'user' ? (
                          <User className="h-4 w-4 text-white" />
                        ) : (
                          <Bot className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                        )}
                      </div>
                      <div className={`rounded-lg p-3 ${
                        message.sender === 'user' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-md'
                      }`}>
                        {message.text}
                      </div>
                    </div>
                    {message.action && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => window.location.href = message.action.link}
                          className="mt-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition-all duration-200 flex items-center space-x-2"
                        >
                          <span>{message.action.text}</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </Button>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
              {showQuestions && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-wrap gap-2 mt-4"
                >
                  {predefinedQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuestionClick(question)}
                      className="text-xs bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 border border-blue-200 dark:border-blue-800 transition-colors duration-200"
                    >
                      {question.question}
                    </Button>
                  ))}
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="p-4 bg-white dark:bg-gray-800 flex items-center border-t border-gray-200 dark:border-gray-700">
              <Input
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-grow mr-2 bg-gray-100 dark:bg-gray-700 border-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 rounded-full px-4 py-2 text-gray-800 dark:text-white"
              />
              <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 transition-colors duration-200">
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              onClick={toggleChat}
              className="rounded-full w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg flex items-center justify-center transition-all duration-300"
            >
              <Bot className="h-8 w-8" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
