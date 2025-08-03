import { Router } from 'express';
import {
    createSurveyController,
    allSurveyController,
    updateSurveyController,
} from '../controls/surveys/survey.controller';

import { validateAdminLogin } from '../middelware/validateAuth.middleware';
import { validateAuthEmployeeLogin } from '../middelware/validateAuthEmployee.middleware';

const router = Router();

// Create a new survey (admin only, with validation)
router.post(
    '/',
    validateAdminLogin,
    // validateCreateSurvey, // uncomment if you use survey validation middleware
    createSurveyController
);

// List all surveys (for both admins and employees)
router.get('/', validateAuthEmployeeLogin, allSurveyController);

// Update a survey by ID (admin only)
router.put('/:id', validateAdminLogin, updateSurveyController);

export default router;
