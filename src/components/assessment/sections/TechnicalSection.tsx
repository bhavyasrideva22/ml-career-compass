import { useState } from 'react';
import { useAssessmentStore } from '@/lib/assessment-store';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Calculator, Database, Cpu } from 'lucide-react';

const technicalQuestions = [
  {
    id: 'logic_1',
    type: 'radio',
    category: 'Logic & Problem Solving',
    question: 'What comes next in the sequence: 2, 4, 8, 16, ?',
    options: ['24', '32', '30', '20'],
    correct: '32',
    icon: Cpu
  },
  {
    id: 'math_1',
    type: 'radio',
    category: 'Mathematical Foundation',
    question: 'In linear algebra, what does matrix multiplication represent?',
    options: [
      'Element-wise multiplication of corresponding entries',
      'Linear transformation composition',
      'Addition of matrix dimensions',
      'Finding matrix determinant'
    ],
    correct: 'Linear transformation composition',
    icon: Calculator
  },
  {
    id: 'programming_1',
    type: 'radio',
    category: 'Programming Basics',
    question: 'Which Python data structure would be most efficient for checking if an item exists?',
    options: ['List', 'Tuple', 'Set', 'Dictionary keys'],
    correct: 'Set',
    icon: Code
  },
  {
    id: 'ml_1',
    type: 'radio',
    category: 'ML Concepts',
    question: 'What is overfitting in machine learning?',
    options: [
      'When a model performs well on training data but poorly on new data',
      'When a model has too few parameters',
      'When training takes too long',
      'When the dataset is too small'
    ],
    correct: 'When a model performs well on training data but poorly on new data',
    icon: Database
  },
  {
    id: 'ml_2',
    type: 'radio',
    category: 'ML Tools',
    question: 'Which library is primarily used for deep learning in Python?',
    options: ['Pandas', 'NumPy', 'TensorFlow', 'Matplotlib'],
    correct: 'TensorFlow',
    icon: Database
  },
  {
    id: 'scenario_1',
    type: 'radio',
    category: 'Practical Application',
    question: 'You need to predict house prices based on features like size, location, and age. Which approach would you choose?',
    options: [
      'Linear Regression',
      'K-Means Clustering',
      'Decision Tree Classification',
      'Principal Component Analysis'
    ],
    correct: 'Linear Regression',
    icon: Cpu
  }
];

export function TechnicalSection() {
  const { addResponse, completeSection } = useAssessmentStore();
  const [responses, setResponses] = useState<Record<string, string>>({});
  
  const handleResponse = (questionId: string, value: string) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
    addResponse('technical', { questionId, answer: value });
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    technicalQuestions.forEach(question => {
      if (responses[question.id] === question.correct) {
        correctAnswers++;
      }
    });
    return Math.round((correctAnswers / technicalQuestions.length) * 100);
  };

  const handleComplete = () => {
    const score = calculateScore();
    completeSection('technical', score);
  };

  const isComplete = technicalQuestions.every(q => responses[q.id] !== undefined);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold gradient-text mb-4">
          Technical & Aptitude Assessment
        </h2>
        <p className="text-muted-foreground text-lg">
          Testing your foundational technical knowledge and problem-solving skills
        </p>
      </div>

      <div className="grid gap-6">
        {technicalQuestions.map((question, index) => {
          const Icon = question.icon;
          
          return (
            <Card key={question.id} className="glass-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{question.category}</CardTitle>
                    <CardDescription>Question {index + 1} of {technicalQuestions.length}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-foreground mb-6 text-lg">{question.question}</p>
                
                <RadioGroup
                  value={responses[question.id]}
                  onValueChange={(value) => handleResponse(question.id, value)}
                >
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`${question.id}_${optionIndex}`} />
                      <Label htmlFor={`${question.id}_${optionIndex}`} className="cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
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
            Complete Technical Assessment
          </Button>
        </div>
      )}
    </div>
  );
}