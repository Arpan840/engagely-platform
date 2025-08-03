import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const RegisterSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  password: z.string().min(6),
  role: z.string().min(1)
});

export function validateRegister(req: Request, res: Response, next: NextFunction) {
  const result = RegisterSchema.safeParse(req.body);
 if (!result.success) {
  const errors = result.error.issues.map(issue => ({
    path: issue.path,
    message: issue.message,
  }));
  return res.status(400).json({ errors });
}
    // If validation passes, continue to the next middleware
    next();
    
}

export function validateLogin(req: Request, res: Response, next: NextFunction) {
  const LoginSchema = z.object({
    email: z.email(),
    password: z.string().min(6),
  });

  const result = LoginSchema.safeParse(req.body);
  if (!result.success) {
    const errors = result.error.issues.map(issue => ({
    }));
    return res.status(400).json({ errors });
    }
    // If validation passes, continue to the next middleware
    next();
}
