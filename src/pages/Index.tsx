import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Rocket, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  Star,
  ArrowRight,
  Zap
} from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [isStarting, setIsStarting] = useState(false);

  const handleStartAssessment = () => {
    setIsStarting(true);
    setTimeout(() => {
      navigate('/assessment');
    }, 500);
  };

  const features = [
    {
      icon: Brain,
      title: 'Psychometric Evaluation',
      description: 'Assess personality fit and cognitive style alignment'
    },
    {
      icon: TrendingUp,
      title: 'Technical Readiness',
      description: 'Evaluate programming, math, and ML knowledge'
    },
    {
      icon: Star,
      title: 'WISCAR Framework',
      description: 'Comprehensive career fit analysis'
    }
  ];

  const benefits = [
    'Personalized learning path recommendations',
    'Career alignment insights',
    'Technical skill gap analysis',
    'Next steps action plan'
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="mb-8">
            <Badge variant="secondary" className="mb-4 px-4 py-2">
              <Zap className="w-4 h-4 mr-2" />
              AI-Powered Career Assessment
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6 leading-tight">
              Am I Ready to Become a<br />
              <span className="floating-animation inline-block">Machine Learning Engineer?</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Discover your readiness for ML engineering with our comprehensive assessment. 
              Get personalized insights, skill gap analysis, and a tailored learning roadmap.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="glow-button text-lg px-8 py-6 h-auto"
              onClick={handleStartAssessment}
              disabled={isStarting}
            >
              {isStarting ? (
                <>
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2" />
                  Starting Assessment...
                </>
              ) : (
                <>
                  <Rocket className="w-5 h-5 mr-2" />
                  Start Assessment
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
            
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>20-30 minutes</span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">95%</div>
              <div className="text-sm text-muted-foreground">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">10K+</div>
              <div className="text-sm text-muted-foreground">Assessments Taken</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">25</div>
              <div className="text-sm text-muted-foreground">Questions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">6</div>
              <div className="text-sm text-muted-foreground">Career Paths</div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="glass-card text-center">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Benefits Section */}
        <Card className="glass-card max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl gradient-text mb-2">
              What You'll Get
            </CardTitle>
            <CardDescription>
              Comprehensive insights to guide your ML engineering journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Discover Your ML Engineering Potential?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who've used our assessment to make 
            informed career decisions and plan their learning journey.
          </p>
          <Button 
            size="lg" 
            variant="hero"
            className="text-lg px-8 py-6 h-auto pulse-glow"
            onClick={handleStartAssessment}
            disabled={isStarting}
          >
            {isStarting ? (
              <>
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2" />
                Preparing Your Assessment...
              </>
            ) : (
              <>
                Begin Your Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
