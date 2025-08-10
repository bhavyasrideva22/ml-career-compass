import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface QuestionResponse {
  questionId: string;
  answer: string | number | string[];
}

export interface AssessmentSection {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  score?: number;
  responses: QuestionResponse[];
}

export interface AssessmentResults {
  psychometricFit: number;
  technicalReadiness: number;
  wiscarScore: number;
  confidenceScore: number;
  recommendation: 'yes' | 'maybe' | 'no';
  nextSteps: string[];
  careerPaths: string[];
}

interface AssessmentStore {
  currentSection: number;
  sections: AssessmentSection[];
  results: AssessmentResults | null;
  isCompleted: boolean;
  
  setCurrentSection: (section: number) => void;
  addResponse: (sectionId: string, response: QuestionResponse) => void;
  completeSection: (sectionId: string, score: number) => void;
  generateResults: () => void;
  resetAssessment: () => void;
}

const initialSections: AssessmentSection[] = [
  {
    id: 'psychometric',
    title: 'Psychometric Evaluation',
    description: 'Evaluate your psychological and personality readiness',
    completed: false,
    responses: []
  },
  {
    id: 'technical',
    title: 'Technical & Aptitude Readiness',
    description: 'Assess your foundational capabilities and domain knowledge',
    completed: false,
    responses: []
  },
  {
    id: 'wiscar',
    title: 'WISCAR Framework',
    description: 'Holistic model measuring career fit & learning potential',
    completed: false,
    responses: []
  }
];

export const useAssessmentStore = create<AssessmentStore>()(
  persist(
    (set, get) => ({
      currentSection: 0,
      sections: initialSections,
      results: null,
      isCompleted: false,

      setCurrentSection: (section) => set({ currentSection: section }),

      addResponse: (sectionId, response) =>
        set((state) => ({
          sections: state.sections.map((section) =>
            section.id === sectionId
              ? {
                  ...section,
                  responses: [
                    ...section.responses.filter(r => r.questionId !== response.questionId),
                    response
                  ]
                }
              : section
          )
        })),

      completeSection: (sectionId, score) =>
        set((state) => ({
          sections: state.sections.map((section) =>
            section.id === sectionId
              ? { ...section, completed: true, score }
              : section
          )
        })),

      generateResults: () => {
        const { sections } = get();
        const psychometricScore = sections.find(s => s.id === 'psychometric')?.score || 0;
        const technicalScore = sections.find(s => s.id === 'technical')?.score || 0;
        const wiscarScore = sections.find(s => s.id === 'wiscar')?.score || 0;
        
        const confidenceScore = Math.round((psychometricScore + technicalScore + wiscarScore) / 3);
        
        let recommendation: 'yes' | 'maybe' | 'no' = 'maybe';
        if (confidenceScore >= 75) recommendation = 'yes';
        else if (confidenceScore < 50) recommendation = 'no';

        const results: AssessmentResults = {
          psychometricFit: psychometricScore,
          technicalReadiness: technicalScore,
          wiscarScore,
          confidenceScore,
          recommendation,
          nextSteps: getNextSteps(recommendation, confidenceScore),
          careerPaths: getCareerPaths(recommendation)
        };

        set({ results, isCompleted: true });
      },

      resetAssessment: () =>
        set({
          currentSection: 0,
          sections: initialSections,
          results: null,
          isCompleted: false
        })
    }),
    {
      name: 'ml-assessment-storage'
    }
  )
);

function getNextSteps(recommendation: string, score: number): string[] {
  if (recommendation === 'yes') {
    return [
      'Start with Python fundamentals',
      'Learn NumPy and Pandas',
      'Take an intro ML course',
      'Build your first model project'
    ];
  } else if (recommendation === 'maybe') {
    return [
      'Strengthen mathematical foundations',
      'Practice programming logic',
      'Explore ML basics through online courses',
      'Consider data analyst roles first'
    ];
  } else {
    return [
      'Explore alternative tech careers',
      'Consider data analysis or software development',
      'Focus on foundational skills first',
      'Reassess in 6-12 months'
    ];
  }
}

function getCareerPaths(recommendation: string): string[] {
  if (recommendation === 'yes') {
    return [
      'Machine Learning Engineer',
      'AI Research Engineer',
      'NLP Engineer',
      'Computer Vision Engineer'
    ];
  } else if (recommendation === 'maybe') {
    return [
      'Data Analyst',
      'Software Engineer',
      'AI Product Manager',
      'Data Engineer'
    ];
  } else {
    return [
      'Software Developer',
      'Data Analyst',
      'Business Analyst',
      'Product Manager'
    ];
  }
}