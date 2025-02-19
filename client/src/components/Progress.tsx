import React from 'react';
import { Brain } from 'lucide-react';

interface ProgressProps {
  current: number;
  total: number;
}

const Progress: React.FC<ProgressProps> = ({ current, total }) => {
  const dueCount = total - current + 1;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md mb-6">
      <div className="flex items-center space-x-3">
        <Brain className="w-6 h-6 text-indigo-500" />
        <div>
          <h2 className="text-lg font-semibold dark:text-white">Today's Review Progress</h2>
          <p className="text-gray-600 dark:text-gray-300">
            {dueCount === 0 
              ? "All caught up! No cards to review." 
              : `${current} of ${total} flashcards reviewed (${dueCount} remaining)`}
          </p>
        </div>
      </div>
      <div className="mt-2 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <div 
          className="bg-indigo-600 h-2.5 rounded-full" 
          style={{ width: `${(current / total) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Progress;