import { getUserById, getUsersList, loginUserService, registerUser } from './users.service';

import { Request, Response } from 'express';

export const registerNewUser = async (req: Request, res: Response) => {
    try {
        const result = await registerUser(req.body);
        res.status(201).json(result);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        // Implement login logic here
        const { email, password } = req.body;
        const result = await loginUserService(email, password);
        res.status(200).json({ message: result.message, user: result.user, token: result.token });
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
}

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await getUsersList();
        res.status(200).json(users);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
}

export const getUserByIdControler = async (req: any, res: Response) => {
    try {
        const userId = req.user.id;
        const user = await getUserById(userId);
        res.status(200).json(user);
    } catch (err: any) {
        res.status(404).json({ message: err.message });
    }
}


