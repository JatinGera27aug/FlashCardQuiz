import axios from 'axios';
import { Flashcard } from '../types/flashcard';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
console.log('API URL:', API_URL);

export const getFlashcards = async (): Promise<Flashcard[]> => {
  try {
    const response = await axios.get(`${API_URL}/all/flashcards`);
    
    const cards = Array.isArray(response.data) 
      ? response.data 
      : response.data.flashcards || response.data.data || [response.data];

    return cards;
  } catch (error) {
    console.error('Error fetching flashcards:', error);
    return []; 
  }
};

export const updateFlashcard = async (id: string, correct: boolean): Promise<Flashcard> => {
  try {
    const response = await axios.put(`${API_URL}/update/flashcard/${id}`, { correct });
    return response.data;
  } catch (error) {
    console.error('Error updating flashcard:', error);
    throw error;
  }
};

export const deleteFlashcard = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/delete/flashcard/${id}`);
  } catch (error) {
    console.error('Error deleting flashcard:', error);
    throw error;
  }
};

const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const serverError = error.response?.data;
    console.error('API Error:', serverError);
    return serverError?.message || 'An unexpected error occurred';
  }
  
  console.error('Unexpected error:', error);
  return 'An unexpected error occurred';
};