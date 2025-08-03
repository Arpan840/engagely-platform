// survey.controller.ts for survey
import {Request, Response, NextFunction } from 'express';
import { createSurvey, listSurveys, updateSurvey } from './survey.service';

// Admin-only: Create survey
export const createSurveyController = async (req: any, res: Response, next: NextFunction) => {
  try {
    console.log(req.user, "user in controller");
    
    const survey = await createSurvey({
      ...(req.body),
      createdBy: req.user.id, // assuming auth middleware sets req.user
    });
    res.status(201).json(survey);
  } catch (error) {
    next(error);
  }
};

// List all surveys (admin or public depending on requirements)
export const allSurveyController = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const surveys = await listSurveys();
    res.json(surveys);
  } catch (error) {
    next(error);
  }
}

// Admin-only: Update survey by ID
export const updateSurveyController= async (req:Request, res:Response, next:NextFunction) => {
  try {
    const updatedSurvey = await updateSurvey(req.params.id, req.body);
    res.json(updatedSurvey);
  } catch (error) {
    next(error);
  }
}
