// survey.interface.ts for survey
export interface CreateSurveyInput {
  title: string;
  description?: string;
  questions: {
    questionText: string;
    type: 'text' | 'rating' | 'multiple-choice';
    options?: string[];
  }[];
  createdBy: string; // admin user id
}