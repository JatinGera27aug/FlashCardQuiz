import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Plus, ArrowLeft, Moon, Sun } from 'lucide-react';
import axios from 'axios';
import { validateFlashcard } from '../types/flashcard';

const AddFlashcard: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [box, setBox] = useState(1);
  const navigate = useNavigate();

  // Dark mode toggle effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const flashcardData = { 
      question, 
      answer, 
      box, 
      nextReviewDate: new Date().toISOString(), 
      _id: '' 
    };

    if (!validateFlashcard(flashcardData)) {
      alert('Please fill in all fields correctly');
      return;
    }
    
    try {
      const res = await axios.post("http://localhost:8000/make/flashcard", flashcardData);
      
      console.log(res.data);
      alert(res.data.message || "Flashcard created successfully!");
      
      // Reset form and navigate
      setQuestion('');
      setAnswer('');
      setBox(1);
      navigate('/');
    } catch (error) {
      console.error('Error creating flashcard:', error);
      alert('Failed to create flashcard. Please try again.');
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const goBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex justify-between items-center mb-8">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-4"
          >
            <motion.button
              onClick={goBack}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <ArrowLeft />
            </motion.button>
            
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
              Add Flashcard
            </h1>
          </motion.div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleDarkMode} 
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              {darkMode ? <Sun className="text-yellow-500" /> : <Moon className="text-blue-500" />}
            </button>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label 
                htmlFor="question" 
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Question
              </label>
              <input
                id="question"
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter flashcard question"
              />
            </div>
            
            <div>
              <label 
                htmlFor="answer" 
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Answer
              </label>
              <textarea
                id="answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                required
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter flashcard answer"
              />
            </div>
            
            <div>
              <label 
                htmlFor="box" 
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Initial Box Number
              </label>
              <select
                id="box"
                value={box}
                onChange={(e) => setBox(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              >
                {[1, 2, 3, 4, 5].map(boxNum => (
                  <option key={boxNum} value={boxNum}>
                    Box {boxNum}
                  </option>
                ))}
              </select>
            </div>
            
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center justify-center"
            >
              <Plus className="mr-2" /> Create Flashcard
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddFlashcard;