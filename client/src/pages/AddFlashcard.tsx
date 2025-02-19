import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import axios from 'axios';
import { validateFlashcard } from '../types/flashcard';

const AddFlashcard: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [box, setBox] = useState(1);  // Default box number is 1
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const flashcardData = { question, answer, box, nextReviewDate: new Date(), _id: '' };

    if (!validateFlashcard(flashcardData)) {
        alert('Please fill in all fields correctly');
        return;
      }
    
    try {
      // first tried formdata then convert to json
      const res = await axios.post("http://localhost:8000/make/flashcard", {
        question,
        answer,
        box
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log(res.data);
      alert(res.data.message || "Flashcard created successfully!");
      
      // Reset form
      setQuestion('');
      setAnswer('');
      setBox(1);
      
      // Navigate  to main page
      navigate('/');
    } catch (error) {
      console.error('Error creating flashcard:', error);
      alert('Failed to create flashcard. Please try again.');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center"
    >
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
          Create Flashcard
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="question" className="block text-gray-700 dark:text-gray-300 mb-2">
              Question
            </label>
            <textarea
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
              rows={3}
              placeholder="Enter your flashcard question"
            />
          </div>
          
          <div>
            <label htmlFor="answer" className="block text-gray-700 dark:text-gray-300 mb-2">
              Answer
            </label>
            <textarea
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
              rows={3}
              placeholder="Enter the answer"
            />
          </div>
          
          <div>
            <label htmlFor="box" className="block text-gray-700 dark:text-gray-300 mb-2">
              Initial Box Number
            </label>
            <select
              id="box"
              value={box}
              onChange={(e) => setBox(Number(e.target.value))}
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
            >
              {[1, 2, 3, 4, 5].map(boxNum => (
                <option key={boxNum} value={boxNum}>
                  Box {boxNum}
                </option>
              ))}
            </select>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full flex items-center justify-center p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus className="mr-2" /> Create Flashcard
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default AddFlashcard;