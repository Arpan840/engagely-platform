// survey.service.ts for survey
import { Survey, ISurvey } from '../../models/survey.model';
import {CreateSurveyInput} from './survey.interface';

export async function createSurvey(input: CreateSurveyInput): Promise<ISurvey> {
    
  const survey = new Survey({
    ...input,
    createdBy: input.createdBy,
    isActive: true,
  });

  await survey.save();
  return survey;
}

export async function listSurveys(): Promise<ISurvey[]> {
  return Survey.find().sort({ createdAt: -1 }).exec();
}

export async function updateSurvey(id: string, updateData: Partial<ISurvey>) {
  const updatedSurvey = await Survey.findByIdAndUpdate(id, updateData, { new: true });
  if (!updatedSurvey) {
    throw new Error('Survey not found');
  }
  return updatedSurvey;
}
