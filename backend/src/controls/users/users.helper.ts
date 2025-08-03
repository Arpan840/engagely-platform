import bcrypt from 'bcryptjs';
import { messages } from "../../messages";
import { User } from "../../models/user.model";
import type { IUser } from "../../models/user.model";
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import env from 'dotenv';
env.config();

export async function validateLogin(email: string, password: string) {
  const user = await User.findOne({ email: email }) as IUser;
  if (!user) throw new Error(messages.EMAIL_NOT_FOUND);
  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) throw new Error(messages.INVALID_PASSWORD);
  const token = generateToken({ id: (user._id as string).toString(), role: user.role });

  return { message: messages.USER_LOGIN_SUCCESSFUL, user: user, token: token };
}

const JWT_SECRET = process.env.JWT_SECRET;

export function generateToken(
  payload: string | object | Buffer,
  expiresIn: SignOptions["expiresIn"] = (process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"]) || '1d'
): string {
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, JWT_SECRET as Secret, options);
}