import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThumbsUp, ThumbsDown, Eye } from 'lucide-react';

interface FlashcardProps {
  question: string;
  answer: string;
  onResponse: (correct: boolean) => void;
}

const Flashcard: React.FC<FlashcardProps> = ({ question, answer, onResponse }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="w-full max-w-xl">
      <motion.div 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 min-h-[200px] flex flex-col"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex-1">
          <AnimatePresence mode="wait">
            {!showAnswer ? (
              <motion.div
                key="question"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xl font-medium text-center dark:text-white"
              >
                {question}
              </motion.div>
            ) : (
              <motion.div
                key="answer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xl font-medium text-center text-indigo-600 dark:text-indigo-400"
              >
                {answer}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-6 flex justify-center space-x-4">
          {!showAnswer ? (
            <button
              onClick={() => setShowAnswer(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Eye className="w-5 h-5" />
              <span>Show Answer</span>
            </button>
          ) : (
            <div className="flex space-x-4">
              <button
                onClick={() => {
                  onResponse(false);
                  setShowAnswer(false);
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <ThumbsDown className="w-5 h-5" />
                <span>Got it Wrong</span>
              </button>
              <button
                onClick={() => {
                  onResponse(true);
                  setShowAnswer(false);
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <ThumbsUp className="w-5 h-5" />
                <span>Got it Right</span>
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Flashcard;