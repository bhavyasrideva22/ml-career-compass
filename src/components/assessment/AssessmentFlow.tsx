import { useState } from 'react';
import { useAssessmentStore } from '@/lib/assessment-store';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Brain, Code, Target } from 'lucide-react';
import { PsychometricSection } from './sections/PsychometricSection';
import { TechnicalSection } from './sections/TechnicalSection';
import { WiscarSection } from './sections/WiscarSection';
import { ResultsSection } from './sections/ResultsSection';

const sectionIcons = {
  psychometric: Brain,
  technical: Code,
  wiscar: Target
};

export function AssessmentFlow() {
  const { 
    currentSection, 
    sections, 
    isCompleted,
    setCurrentSection,
    generateResults 
  } = useAssessmentStore();

  const progress = ((currentSection) / (sections.length)) * 100;
  
  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      generateResults();
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  if (isCompleted) {
    return <ResultsSection />;
  }

  const currentSectionData = sections[currentSection];
  const SectionIcon = sectionIcons[currentSectionData.id as keyof typeof sectionIcons];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
              <SectionIcon className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {currentSectionData.title}
              </h1>
              <p className="text-muted-foreground">
                {currentSectionData.description}
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Progress</span>
              <span>{currentSection + 1} of {sections.length}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Section Content */}
        <Card className="glass-card mb-8">
          <CardContent className="p-8">
            {currentSectionData.id === 'psychometric' && <PsychometricSection />}
            {currentSectionData.id === 'technical' && <TechnicalSection />}
            {currentSectionData.id === 'wiscar' && <WiscarSection />}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentSection === 0}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>
          
          <Button 
            onClick={handleNext}
            className="glow-button flex items-center gap-2"
          >
            {currentSection === sections.length - 1 ? 'Complete Assessment' : 'Next Section'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}