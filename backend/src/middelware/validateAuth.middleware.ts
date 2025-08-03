// Auth validation middelware
import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { messages } from '../messages';

export const validateAdminLogin = (req: any, res: Response, next: NextFunction) => {
    try {
        let token = req.headers['authorization']
        if (!token) {
            return res.status(401).json({ message: messages.TOKEN_NOT_PROVIDED });
        }
        token = token.split(' ')[1]; // Extract token from "Bearer <token>" format
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        if (!decoded) {
            return res.status(401).json({ message: messages.INVALID_TOKEN });
        }
        if (typeof decoded === 'string') {
            return res.status(401).json({ message: messages.INVALID_TOKEN });
        }
        if (decoded?.role !== 'admin') {
            return res.status(401).json({ message: messages.UNAUTHORIZED_ACCESS });
        }
        req.user = decoded; // Attach decoded user info to request
        next();
    } catch (error) {
        next(error);
    }
};