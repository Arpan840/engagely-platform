import { getUserByIdControler, getUsers, loginUser, registerNewUser } from '../controls/users/users.controller';
import { Router } from 'express';
import { validateLogin, validateRegister } from '../middelware/validate.middleware';
import { validateAdminLogin } from '../middelware/validateAuth.middleware';
import { validateAuthEmployeeLogin } from '../middelware/validateAuthEmployee.middleware';
const router = Router();
// User registration route
router.post('/register',validateRegister,registerNewUser);
// User login route
router.post('/login',validateLogin,loginUser);
// User list route
router.get('/userslist',validateAdminLogin,getUsers);

// Get user by ID route
router.get('/loggedInUser',validateAuthEmployeeLogin, getUserByIdControler);

export default router;