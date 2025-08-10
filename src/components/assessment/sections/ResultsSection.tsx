import { useAssessmentStore } from '@/lib/assessment-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  Brain, 
  Code, 
  Target, 
  TrendingUp,
  Users,
  BookOpen,
  Download
} from 'lucide-react';

export function ResultsSection() {
  const { results, resetAssessment } = useAssessmentStore();

  if (!results) return null;

  const getRecommendationIcon = () => {
    switch (results.recommendation) {
      case 'yes': return <CheckCircle className="w-8 h-8 text-success" />;
      case 'maybe': return <AlertCircle className="w-8 h-8 text-warning" />;
      case 'no': return <XCircle className="w-8 h-8 text-destructive" />;
    }
  };

  const getRecommendationTitle = () => {
    switch (results.recommendation) {
      case 'yes': return 'You\'re Ready for ML Engineering!';
      case 'maybe': return 'You Have Potential - Build Your Foundation';
      case 'no': return 'Consider Alternative Paths First';
    }
  };

  const getRecommendationDescription = () => {
    switch (results.recommendation) {
      case 'yes': return 'You demonstrate strong alignment across multiple areas and are ready to begin your ML engineering journey.';
      case 'maybe': return 'You show promise but should strengthen key areas before diving into ML engineering.';
      case 'no': return 'While ML engineering might not be the best immediate fit, there are other rewarding tech paths to explore.';
    }
  };

  const getConfidenceColor = () => {
    if (results.confidenceScore >= 75) return 'text-success';
    if (results.confidenceScore >= 50) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            {getRecommendationIcon()}
          </div>
          <h1 className="text-4xl font-bold gradient-text mb-4">
            Assessment Complete
          </h1>
          <p className="text-xl text-muted-foreground">
            Your personalized ML Engineering readiness report
          </p>
        </div>

        {/* Main Recommendation Card */}
        <Card className="glass-card mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl mb-2">{getRecommendationTitle()}</CardTitle>
            <CardDescription className="text-lg">
              {getRecommendationDescription()}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="mb-6">
              <div className={`text-6xl font-bold ${getConfidenceColor()} mb-2`}>
                {results.confidenceScore}%
              </div>
              <p className="text-muted-foreground">Overall Confidence Score</p>
            </div>
            <Badge 
              variant={results.recommendation === 'yes' ? 'default' : 'secondary'}
              className="text-lg px-6 py-2"
            >
              {results.recommendation === 'yes' ? 'Strong Match' : 
               results.recommendation === 'maybe' ? 'Potential Match' : 'Alternative Paths Recommended'}
            </Badge>
          </CardContent>
        </Card>

        {/* Detailed Scores */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <Brain className="w-6 h-6 text-primary mr-2" />
              <CardTitle className="text-lg">Psychometric Fit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">{results.psychometricFit}%</div>
              <Progress value={results.psychometricFit} className="mb-2" />
              <p className="text-sm text-muted-foreground">
                Personality and interest alignment
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <Code className="w-6 h-6 text-primary mr-2" />
              <CardTitle className="text-lg">Technical Readiness</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">{results.technicalReadiness}%</div>
              <Progress value={results.technicalReadiness} className="mb-2" />
              <p className="text-sm text-muted-foreground">
                Programming and ML knowledge
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <Target className="w-6 h-6 text-primary mr-2" />
              <CardTitle className="text-lg">WISCAR Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">{results.wiscarScore}%</div>
              <Progress value={results.wiscarScore} className="mb-2" />
              <p className="text-sm text-muted-foreground">
                Career fit and learning potential
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Next Steps */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-primary" />
                <CardTitle>Recommended Next Steps</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {results.nextSteps.map((step, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold mt-0.5">
                      {index + 1}
                    </div>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="w-6 h-6 text-primary" />
                <CardTitle>Suitable Career Paths</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {results.careerPaths.map((path, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span>{path}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={() => window.print()} 
            variant="outline" 
            size="lg"
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export Results
          </Button>
          
          <Button 
            onClick={resetAssessment} 
            variant="outline" 
            size="lg"
          >
            Take Assessment Again
          </Button>
          
          <Button 
            size="lg" 
            className="glow-button"
            onClick={() => window.open('https://www.coursera.org/learn/machine-learning', '_blank')}
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Start Learning ML
          </Button>
        </div>

        {/* Additional Information */}
        <Card className="glass-card mt-8">
          <CardHeader>
            <CardTitle>Understanding Your Results</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-invert max-w-none">
            <p className="text-muted-foreground mb-4">
              This assessment evaluates your readiness for Machine Learning Engineering across three key dimensions:
            </p>
            <ul className="text-muted-foreground space-y-2">
              <li><strong>Psychometric Fit:</strong> Your personality traits, interests, and motivational alignment with ML engineering work</li>
              <li><strong>Technical Readiness:</strong> Your current knowledge of programming, mathematics, and ML concepts</li>
              <li><strong>WISCAR Score:</strong> A comprehensive framework measuring Will, Interest, Skill, Cognitive readiness, Ability to learn, and Real-world alignment</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              Remember, these results are indicative and meant to guide your learning journey. With dedication and the right resources, anyone can develop the skills needed for ML engineering.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}