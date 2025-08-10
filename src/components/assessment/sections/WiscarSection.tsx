import { useState } from 'react';
import { useAssessmentStore } from '@/lib/assessment-store';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Heart, Code, Brain, GraduationCap, Target } from 'lucide-react';

const wiscarDimensions = [
  {
    id: 'will',
    title: 'Will (Persistence & Grit)',
    description: 'Your ability to maintain effort and interest despite challenges',
    icon: Zap,
    questions: [
      'I finish whatever I begin, even when it gets difficult',
      'I have overcome setbacks to conquer important challenges',
      'I am diligent and work hard consistently'
    ]
  },
  {
    id: 'interest',
    title: 'Interest (Passion for AI/ML)',
    description: 'Your genuine enthusiasm for machine learning and AI',
    icon: Heart,
    questions: [
      'I actively seek out information about AI and machine learning',
      'I enjoy discussing AI/ML concepts with others',
      'I find the potential of AI exciting and motivating'
    ]
  },
  {
    id: 'skill',
    title: 'Skill (Current Technical Ability)',
    description: 'Your baseline programming and ML knowledge',
    icon: Code,
    questions: [
      'I am comfortable writing and debugging Python code',
      'I understand basic statistics and probability concepts',
      'I can work with data using tools like Excel or programming languages'
    ]
  },
  {
    id: 'cognitive',
    title: 'Cognitive Readiness (Analytical Thinking)',
    description: 'Your problem-solving and analytical mindset',
    icon: Brain,
    questions: [
      'I enjoy breaking down complex problems into smaller parts',
      'I can think logically and reason through abstract concepts',
      'I am comfortable with mathematical and statistical thinking'
    ]
  },
  {
    id: 'ability_to_learn',
    title: 'Ability to Learn (Growth Mindset)',
    description: 'Your openness to learning new concepts and skills',
    icon: GraduationCap,
    questions: [
      'I believe my abilities can be developed through dedication and hard work',
      'I see failures and challenges as opportunities to grow',
      'I enjoy learning new technologies and concepts'
    ]
  },
  {
    id: 'real_world',
    title: 'Real-World Alignment (Job Understanding)',
    description: 'Your understanding of ML engineering career demands',
    icon: Target,
    questions: [
      'I understand that ML engineering involves both coding and data analysis',
      'I am prepared for continuous learning throughout my career',
      'I can work effectively in team environments on technical projects'
    ]
  }
];

export function WiscarSection() {
  const { addResponse, completeSection } = useAssessmentStore();
  const [responses, setResponses] = useState<Record<string, number[]>>({});
  
  const handleResponse = (dimensionId: string, questionIndex: number, value: number[]) => {
    const currentResponses = responses[dimensionId] || [];
    const newResponses = [...currentResponses];
    newResponses[questionIndex] = value[0];
    
    setResponses(prev => ({ ...prev, [dimensionId]: newResponses }));
    addResponse('wiscar', { 
      questionId: `${dimensionId}_${questionIndex}`, 
      answer: value[0] 
    });
  };

  const calculateDimensionScore = (dimensionId: string) => {
    const dimensionResponses = responses[dimensionId] || [];
    if (dimensionResponses.length === 0) return 0;
    
    const average = dimensionResponses.reduce((sum, score) => sum + score, 0) / dimensionResponses.length;
    return Math.round((average / 5) * 100);
  };

  const calculateOverallScore = () => {
    const scores = wiscarDimensions.map(d => calculateDimensionScore(d.id));
    const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    return Math.round(average);
  };

  const handleComplete = () => {
    const score = calculateOverallScore();
    completeSection('wiscar', score);
  };

  const isComplete = wiscarDimensions.every(dimension => 
    responses[dimension.id] && responses[dimension.id].length === dimension.questions.length
  );

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold gradient-text mb-4">
          WISCAR Framework Assessment
        </h2>
        <p className="text-muted-foreground text-lg">
          Holistic evaluation of your career fit and learning potential
        </p>
      </div>

      <div className="grid gap-8">
        {wiscarDimensions.map((dimension, dimensionIndex) => {
          const Icon = dimension.icon;
          const dimensionScore = calculateDimensionScore(dimension.id);
          
          return (
            <Card key={dimension.id} className="glass-card">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl">{dimension.title}</CardTitle>
                    <CardDescription className="text-base">{dimension.description}</CardDescription>
                  </div>
                  {dimensionScore > 0 && (
                    <div className="text-2xl font-bold text-primary">
                      {dimensionScore}%
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {dimension.questions.map((question, questionIndex) => (
                  <div key={questionIndex} className="space-y-3">
                    <p className="text-foreground">{question}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Strongly Disagree</span>
                        <span>Strongly Agree</span>
                      </div>
                      <Slider
                        value={[(responses[dimension.id] && responses[dimension.id][questionIndex]) || 3]}
                        onValueChange={(value) => handleResponse(dimension.id, questionIndex, value)}
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
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {isComplete && (
        <div className="text-center pt-6">
          <div className="mb-4">
            <div className="text-3xl font-bold gradient-text mb-2">
              Overall WISCAR Score: {calculateOverallScore()}%
            </div>
            <p className="text-muted-foreground">
              Complete your assessment to see detailed results and recommendations
            </p>
          </div>
          <Button 
            onClick={handleComplete} 
            size="lg" 
            className="glow-button"
          >
            Complete WISCAR Assessment
          </Button>
        </div>
      )}
    </div>
  );
}