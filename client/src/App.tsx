import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun, Plus, Trash2 } from 'lucide-react';
import Flashcard from './components/Flashcard';
import Progress from './components/Progress';
import { getFlashcards, updateFlashcard, deleteFlashcard } from './api/flashcards';
import type { Flashcard as FlashcardType } from './types/flashcard';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [flashcards, setFlashcards] = useState<FlashcardType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await getFlashcards();
        
        console.group('Flashcard Fetching');
        console.log('Raw cards:', response);
        const flashcardsArray = response[0]?.flashCards || response;

        console.log('Extracted Flashcards:', flashcardsArray);
        
        const dueCards = flashcardsArray.filter((card: FlashcardType) => {
          const nextReviewDate = new Date(card.nextReviewDate);
          const today = new Date();
          const isDue = nextReviewDate <= today;
          
          console.log(`Card: ${card.question}`, {
            nextReviewDate,
            today,
            isDue
          });
          
          return isDue;
        });

        console.log('Due cards:', dueCards);
        console.groupEnd();

        setFlashcards(dueCards.length > 0 ? dueCards : flashcardsArray);
      } catch (error) {
        console.error('Error fetching flashcards:', error);
      }
    };

    fetchFlashcards();
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleResponse = async (correct: boolean) => {
    if (flashcards.length === 0) return;

    const currentCard = flashcards[currentIndex];

    try {
      const cardId = currentCard._id;
      
      if (!cardId) {
        console.error('No ID found for current card', currentCard);
        return;
      }

      await updateFlashcard(cardId, correct);
      
      setFlashcards(prev => prev.filter((_, index) => index !== currentIndex));

      setCurrentIndex(prevIndex =>
        prevIndex >= flashcards.length - 1 ? 0 : prevIndex
      );
    } catch (error) {
      console.error('Error updating flashcard:', error);
    }
  };

  const handleDelete = async () => {
    if (flashcards.length === 0) return;

    const currentCard = flashcards[currentIndex];
    const cardId = currentCard._id;

    try {
      await deleteFlashcard(cardId);
      
      setFlashcards(prev => prev.filter((_, index) => index !== currentIndex));

      setCurrentIndex(prevIndex =>
        prevIndex >= flashcards.length - 1 ? 0 : prevIndex
      );
    } catch (error) {
      console.error('Error deleting flashcard:', error);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const currentCard = flashcards[currentIndex];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Flashcard Review
          </h1>
          
          <div className="flex items-center space-x-4">
            <Link to="/add">
              <button
                className="p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-colors"
              >
                <Plus />
              </button>
            </Link>
            
            <button 
              onClick={toggleDarkMode} 
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              {darkMode ? <Sun className="text-yellow-500" /> : <Moon className="text-blue-500" />}
            </button>
          </div>
        </div>

        <div className="flex justify-center items-center mt-8 flex-grow">
          {flashcards.length > 0 && currentCard ? (
            <div className="w-full max-w-md">
              <Flashcard
                question={currentCard.question}
                answer={currentCard.answer}
                onResponse={handleResponse}
              />
              <div className="flex justify-center mt-5 space-x-4 mb-5">
                <button 
                  onClick={handleDelete}
                  className="text-red-500 hover:text-red-600 transition-colors"
                  title="Delete Flashcard"
                >
                  <Trash2 className="w-8 h-8" />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-600 dark:text-gray-300">
              <p className="text-xl">No flashcards available!</p>
              <p className="mt-2">Either all cards are reviewed or there are no cards.</p>
            </div>
          )}
        </div>

        {flashcards.length > 0 && (
          <Progress 
            current={currentIndex + 1} 
            total={flashcards.length} 
          />
        )}
      </div>
    </div>
  );
}

export default App;