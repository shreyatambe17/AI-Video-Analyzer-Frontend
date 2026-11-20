import React from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { StudyHeader } from '../components/pages/flashcardsQuiz/StudyHeader';
import { FlashcardDeck } from '../components/pages/flashcardsQuiz/FlashcardDeck';
import { QuizSection } from '../components/pages/flashcardsQuiz/QuizSection';

export const FlashcardsQuizPage = () => {
  return (
    <AppLayout>
      <div className="space-y-4">
        <StudyHeader />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FlashcardDeck />
          <QuizSection />
        </div>
      </div>
    </AppLayout>
  );
};

export default FlashcardsQuizPage;
