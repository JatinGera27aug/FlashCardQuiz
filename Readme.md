# Alfred Leitner: Spaced Repetition Flashcard Learning Application

## 🌟 Project Overview
Inspired by the Leitner system, this app helps users optimize their learning process by intelligently managing flashcard review intervals.

## Live Demo
Frontend: https://flashcard-quiz-learning.netlify.app/

Backend: https://flashcardquiz-1je0.onrender.com

## 🚀 Tech Stack and Architecture

### Frontend
- **React** (with TypeScript)
  - Provides a robust, type-safe, and component-based architecture
  - Enables complex UI interactions with minimal boilerplate
- **Vite** as build tool
  - Offers lightning-fast development experience
  - Supports modern JavaScript features
- **Tailwind CSS**
  - Utility-first CSS framework
  - Enables rapid UI development
  - Built-in dark mode support
- **Framer Motion**
  - Adds smooth, professional animations
  - Enhances user experience

### State Management
- Native React Hooks (useState, useEffect)
- Minimal external state management for simplicity

### API Interaction
- **Axios** for HTTP requests
- Centralized error handling
- Environment-based configuration

## 🔧 Key Features

1. **Spaced Repetition Algorithm**
   - Automatically calculates next review date
   - Supports 5 difficulty boxes
   - Adaptive learning progression

2. **Responsive Design**
   - Mobile-friendly interface
   - Dark/Light mode toggle
   - Accessible UI components

3. **Flashcard Management**
   - Add new flashcards
   - Review due flashcards
   - Delete flashcards
   - Track learning progress

## 🛠 Development Journey and Problem-Solving

### Challenges and Solutions

1. **API Data Handling**
   - **Problem**: Inconsistent API response structures
   - **Solution**: 
     ```typescript
     const flashcardsArray = Array.isArray(response) 
       ? response 
       : response[0]?.flashCards || [];
     ```

2. **Error Handling**
   - **Problem**: Scattered error management
   - **Solution**: Centralized error utility
     ```typescript
     export const handleApiError = (error: unknown): string => {
       // Comprehensive error parsing and logging
     }
     ```

3. **Input Validation**
   - **Problem**: Lack of form validation
   - **Solution**: Implement validation function
     ```typescript
     export const validateFlashcard = (data: Flashcard): boolean => {
       return data.question.trim().length > 0 &&
              data.answer.trim().length > 0;
     }
     ```
