import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './shared/Navbar';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const InputField = ({ name, placeholder, value, onChange, type = 'text' }) => (
  <input
    type={type}
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
  />
);

const TextAreaField = ({ name, placeholder, value, onChange, rows = 4 }) => (
  <textarea
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    rows={rows}
    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
  />
);

const SectionTitle = ({ title }) => (
  <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white border-b-2 border-blue-500 pb-2">{title}</h2>
);

const AddButton = ({ onClick, text }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    type="button"
    onClick={onClick}
    className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors duration-200"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
    </svg>
    {text}
  </motion.button>
);

const GenerateResume = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    summary: '',
    education: [{ institution: '', degree: '', year: '' }],
    experience: [{ company: '', position: '', duration: '', description: '' }],
    skills: '',
  });

  const handleChange = (e, index, field) => {
    if (field === 'education' || field === 'experience') {
      const updatedData = [...formData[field]];
      updatedData[index][e.target.name] = e.target.value;
      setFormData({ ...formData, [field]: updatedData });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const addField = (field) => {
    if (field === 'education') {
      setFormData({
        ...formData,
        education: [...formData.education, { institution: '', degree: '', year: '' }],
      });
    } else if (field === 'experience') {
      setFormData({
        ...formData,
        experience: [...formData.experience, { company: '', position: '', duration: '', description: '' }],
      });
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    try {
      // Set document properties
      doc.setProperties({
        title: `${formData.name} - Resume`,
        subject: 'Resume',
        author: formData.name,
        keywords: 'resume, cv',
        creator: 'Resume Generator'
      });

      // Define colors
      const primaryColor = [41, 128, 185]; // A nice blue color
      const secondaryColor = [52, 73, 94]; // A dark grayish blue

      // Header
      doc.setFillColor(...primaryColor);
      doc.rect(0, 0, 210, 40, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.text(formData.name.toUpperCase(), 105, 20, { align: 'center' });

      // Contact info
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`Email: ${formData.email} | Phone: ${formData.phone}`, 105, 30, { align: 'center' });

      // Reset text color
      doc.setTextColor(0, 0, 0);

      let yPos = 50;

      // Summary
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...secondaryColor);
      doc.text('PROFESSIONAL SUMMARY', 20, yPos);
      doc.line(20, yPos + 1, 190, yPos + 1);
      yPos += 10;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);
      const summaryLines = doc.splitTextToSize(formData.summary, 170);
      doc.text(summaryLines, 20, yPos);
      yPos += summaryLines.length * 5 + 10;

      // Education
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...secondaryColor);
      doc.text('EDUCATION', 20, yPos);
      doc.line(20, yPos + 1, 190, yPos + 1);
      yPos += 10;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);
      formData.education.forEach((edu) => {
        doc.setFont('helvetica', 'bold');
        doc.text(`${edu.institution}`, 20, yPos);
        yPos += 5;
        doc.setFont('helvetica', 'normal');
        doc.text(`${edu.degree} (${edu.year})`, 20, yPos);
        yPos += 10;
      });

      // Experience
      yPos += 5;
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...secondaryColor);
      doc.text('EXPERIENCE', 20, yPos);
      doc.line(20, yPos + 1, 190, yPos + 1);
      yPos += 10;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);
      formData.experience.forEach((exp) => {
        doc.setFont('helvetica', 'bold');
        doc.text(`${exp.company} - ${exp.position}`, 20, yPos);
        yPos += 5;
        doc.setFont('helvetica', 'italic');
        doc.text(`Duration: ${exp.duration}`, 20, yPos);
        yPos += 5;
        doc.setFont('helvetica', 'normal');
        const descLines = doc.splitTextToSize(exp.description, 170);
        doc.text(descLines, 20, yPos);
        yPos += descLines.length * 5 + 10;
      });

      // Skills
      yPos += 5;
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...secondaryColor);
      doc.text('SKILLS', 20, yPos);
      doc.line(20, yPos + 1, 190, yPos + 1);
      yPos += 10;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);
      const skillsLines = doc.splitTextToSize(formData.skills, 170);
      doc.text(skillsLines, 20, yPos);

      // Footer
      const pageCount = doc.internal.getNumberOfPages();
      doc.setFontSize(8);
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.text(`Page ${i} of ${pageCount}`, 105, 290, { align: 'center' });
      }
      
      // Save the PDF
      doc.save(`${formData.name.replace(/\s+/g, '_')}_Resume.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('An error occurred while generating the PDF. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto p-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
        >
          <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-8">Create Your Professional Resume</h1>
          <form className="space-y-8">
            <div className="bg-blue-50 dark:bg-gray-700 p-6 rounded-lg shadow-inner">
              <SectionTitle title="Personal Information" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
                <InputField name="email" placeholder="Email" value={formData.email} onChange={handleChange} type="email" />
                <InputField name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} type="tel" />
              </div>
            </div>

            <div className="bg-green-50 dark:bg-gray-700 p-6 rounded-lg shadow-inner">
              <SectionTitle title="Professional Summary" />
              <TextAreaField name="summary" placeholder="Write a brief summary of your professional background" value={formData.summary} onChange={handleChange} />
            </div>

            <div className="bg-yellow-50 dark:bg-gray-700 p-6 rounded-lg shadow-inner">
              <SectionTitle title="Education" />
              {formData.education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
                >
                  <InputField name="institution" placeholder="Institution" value={edu.institution} onChange={(e) => handleChange(e, index, 'education')} />
                  <InputField name="degree" placeholder="Degree" value={edu.degree} onChange={(e) => handleChange(e, index, 'education')} />
                  <InputField name="year" placeholder="Year" value={edu.year} onChange={(e) => handleChange(e, index, 'education')} />
                </motion.div>
              ))}
              <AddButton onClick={() => addField('education')} text="Add Education" />
            </div>

            <div className="bg-red-50 dark:bg-gray-700 p-6 rounded-lg shadow-inner">
              <SectionTitle title="Experience" />
              {formData.experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
                >
                  <InputField name="company" placeholder="Company" value={exp.company} onChange={(e) => handleChange(e, index, 'experience')} />
                  <InputField name="position" placeholder="Position" value={exp.position} onChange={(e) => handleChange(e, index, 'experience')} />
                  <InputField name="duration" placeholder="Duration" value={exp.duration} onChange={(e) => handleChange(e, index, 'experience')} />
                  <TextAreaField name="description" placeholder="Job Description" value={exp.description} onChange={(e) => handleChange(e, index, 'experience')} rows={3} />
                </motion.div>
              ))}
              <AddButton onClick={() => addField('experience')} text="Add Experience" />
            </div>

            <div className="bg-purple-50 dark:bg-gray-700 p-6 rounded-lg shadow-inner">
              <SectionTitle title="Skills" />
              <TextAreaField name="skills" placeholder="List your skills (comma-separated)" value={formData.skills} onChange={handleChange} />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                generatePDF();
              }}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-800 text-white p-4 rounded-lg hover:from-blue-600 hover:to-blue-800 dark:hover:from-blue-700 dark:hover:to-blue-900 transition duration-300 font-semibold text-lg flex items-center justify-center gap-2 shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Generate and Download Resume
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default GenerateResume;