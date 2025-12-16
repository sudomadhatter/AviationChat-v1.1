"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const quiz = {
  question: 'What is the primary purpose of a RAT (Ram Air Turbine) in a commercial aircraft?',
  options: [
    'To provide power to cabin lighting.',
    'To provide essential hydraulic and electrical power in an emergency.',
    'To cool the avionics bay.',
    'To assist with landing gear retraction.',
  ],
  correctAnswer: 1,
};

type AnswerState = 'unanswered' | 'correct' | 'incorrect';

export default function QuizCard() {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>('unanswered');

  const handleAnswer = (index: number) => {
    if (answerState !== 'unanswered') return;

    setSelectedAnswer(index);
    if (index === quiz.correctAnswer) {
      setAnswerState('correct');
    } else {
      setAnswerState('incorrect');
    }
  };

  const getButtonClass = (index: number) => {
    if (answerState === 'unanswered') {
      return 'justify-start text-left';
    }
    if (index === quiz.correctAnswer) {
      return 'justify-start text-left bg-secondary text-secondary-foreground hover:bg-secondary/90';
    }
    if (index === selectedAnswer && index !== quiz.correctAnswer) {
      return 'justify-start text-left bg-destructive text-destructive-foreground hover:bg-destructive/90';
    }
    return 'justify-start text-left bg-muted/50';
  };

  return (
    <Card className="bg-background/50">
      <CardContent className="p-4">
        <p className="mb-4 font-medium text-sm">{quiz.question}</p>
        <div className="grid grid-cols-1 gap-2">
          {quiz.options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              className={cn('h-auto whitespace-normal py-2 transition-all', getButtonClass(index))}
              onClick={() => handleAnswer(index)}
              disabled={answerState !== 'unanswered'}
            >
              {option}
            </Button>
          ))}
        </div>
        {answerState === 'correct' && (
          <p className="mt-4 text-sm font-semibold text-secondary">Correct! The RAT is a critical emergency system.</p>
        )}
        {answerState === 'incorrect' && (
          <p className="mt-4 text-sm font-semibold text-destructive">Not quite. The correct answer has been highlighted.</p>
        )}
      </CardContent>
    </Card>
  );
}
