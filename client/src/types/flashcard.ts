export interface Flashcard {
  
  question: string;
  answer: string;
  box: number;
  nextReviewDate: string;
  _id: string;
}

// Validate input before submission
export const validateFlashcard = (data: Flashcard): boolean => {
  return (
    data.question.trim().length > 0 &&
    data.answer.trim().length > 0 &&
    data.box >= 1 && data.box <= 5
  );
};