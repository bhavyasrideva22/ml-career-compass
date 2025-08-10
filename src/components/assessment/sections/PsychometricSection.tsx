import { useState } from 'react';
import { useAssessmentStore } from '@/lib/assessment-store';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Brain, Target, Zap } from 'lucide-react';

const psychometricQuestions = [
  {
    id: 'interest_1',
    type: 'likert',
    category: 'Interest Scale',
    question: 'I enjoy designing systems that solve real-world problems using data.',
    icon: Target
  },
  {
    id: 'interest_2',
    type: 'likert',
    category: 'Interest Scale',
    question: 'I find pattern recognition and data analysis fascinating.',
    icon: Brain
  },
  {
    id: 'personality_1',
    type: 'likert',
    category: 'Personality',
    question: 'I am comfortable working with uncertainty and ambiguous problems.',
    icon: Zap
  },
  {
    id: 'personality_2',
    type: 'likert',
    category: 'Personality',
    question: 'I enjoy learning new technologies and staying updated with latest trends.',
    icon: Heart
  },
  {
    id: 'motivation_1',
    type: 'radio',
    category: 'Motivation',
    question: 'What primarily motivates you in your career?',
    options: [
      'Solving challenging technical problems',
      'High salary and job security',
      'Making a positive impact on society',
      'Being recognized as an expert'
    ]
  },
  {
    id: 'cognitive_1',
    type: 'radio',
    category: 'Cognitive Style',
    question: 'When approaching a complex problem, you prefer to:',
    options: [
      'Break it down into smaller, logical steps',
      'Explore creative and unconventional solutions',
      'Research similar problems and their solutions',
      'Collaborate with others to find the best approach'
    ]
  }
];

export function PsychometricSection() {
  const { addResponse, completeSection } = useAssessmentStore();
  const [responses, setResponses] = useState<Record<string, string | number>>({});
  
  const handleLikertResponse = (questionId: string, value: number[]) => {
    const response = value[0];
    setResponses(prev => ({ ...prev, [questionId]: response }));
    addResponse('psychometric', { questionId, answer: response });
  };

  const handleRadioResponse = (questionId: string, value: string) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
    addResponse('psychometric', { questionId, answer: value });
  };

  const calculateScore = () => {
    const likertQuestions = psychometricQuestions.filter(q => q.type === 'likert');
    const radioQuestions = psychometricQuestions.filter(q => q.type === 'radio');
    
    const likertScore = likertQuestions.reduce((sum, q) => {
      const response = responses[q.id] as number;
      return sum + (response || 0);
    }, 0);
    
    const radioScore = radioQuestions.length * 3; // Assume average scoring for radio
    const maxLikertScore = likertQuestions.length * 5;
    const maxRadioScore = radioQuestions.length * 3;
    
    return Math.round(((likertScore + radioScore) / (maxLikertScore + maxRadioScore)) * 100);
  };

  const handleComplete = () => {
    const score = calculateScore();
    completeSection('psychometric', score);
  };

  const isComplete = psychometricQuestions.every(q => responses[q.id] !== undefined);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold gradient-text mb-4">
          Psychometric Evaluation
        </h2>
        <p className="text-muted-foreground text-lg">
          Understanding your psychological fit for Machine Learning Engineering
        </p>
      </div>

      <div className="grid gap-6">
        {psychometricQuestions.map((question, index) => {
          const Icon = question.icon || Brain;
          
          return (
            <Card key={question.id} className="glass-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{question.category}</CardTitle>
                    <CardDescription>Question {index + 1} of {psychometricQuestions.length}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-foreground mb-6 text-lg">{question.question}</p>
                
                {question.type === 'likert' ? (
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Strongly Disagree</span>
                      <span>Strongly Agree</span>
                    </div>
                    <Slider
                      value={[responses[question.id] as number || 3]}
                      onValueChange={(value) => handleLikertResponse(question.id, value)}
                      max={5}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1</span>
                      <span>2</span>
                      <span>3</span>
                      <span>4</span>
                      <span>5</span>
                    </div>
                  </div>
                ) : (
                  <RadioGroup
                    value={responses[question.id] as string}
                    onValueChange={(value) => handleRadioResponse(question.id, value)}
                  >
                    {question.options?.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={`${question.id}_${optionIndex}`} />
                        <Label htmlFor={`${question.id}_${optionIndex}`} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {isComplete && (
        <div className="text-center pt-6">
          <Button 
            onClick={handleComplete} 
            size="lg" 
            className="glow-button"
          >
            Complete Psychometric Assessment
          </Button>
        </div>
      )}
    </div>
  );
}