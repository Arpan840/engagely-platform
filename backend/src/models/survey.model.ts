import mongoose, { Document, Schema } from 'mongoose';

export interface ISurvey extends Document {
  title: string;
  description?: string;
  questions: Array<{
    questionText: string;
    type: 'text' | 'rating' | 'multiple-choice'; // Extend as needed
    options?: string[]; // For multiple-choice questions
  }>;
  createdBy: mongoose.Types.ObjectId; // reference to admin user id
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean; // Indicates if survey is active for employees
}

const QuestionSchema = new Schema({
  questionText: { type: String, required: true },
  type: { type: String, enum: ['text', 'rating', 'multiple-choice'], required: true },
  options: [{ type: String }] // Optional, only for multiple-choice
});

const SurveySchema = new Schema<ISurvey>(
  {
    title: { type: String, required: true },
    description: { type: String },
    questions: { type: [QuestionSchema], required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Survey = mongoose.model<ISurvey>('Survey', SurveySchema);
