import { messages } from '../../messages';
import { User } from '../../models/user.model';
import bcrypt from 'bcryptjs';
import { validateLogin } from './users.helper';

export async function registerUser(userData: { name: string; email: string; password: string; role: string; }) {
  // Check if user exists
  const existing = await User.findOne({ email: userData.email });
  if (existing) throw new Error(messages.EMAIL_ALREADY_REGISTERED);

  // Hash password
  const passwordHash = await bcrypt.hash(userData.password, process.env.SOLTROUND ? parseInt(process.env.SOLTROUND) : 10);

  // Create user
  const user = new User({
    name: userData.name,
    email: userData.email,
    passwordHash,
    role: userData.role
  });
  await user.save();

  return { message: messages.USER_REGISTERED_SUCCESSFULLY };
}

// loginUser function can be implemented similarly
export async function loginUserService(email: string, password: string) {
  try {
    const data = await validateLogin(email, password)
    return { message: data.message, user: data.user, token: data.token };
  } catch (error: any) {
    throw new Error(error.message);
  }

}

// users list
export async function getUsersList() {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error(messages.INTERNAL_SERVER_ERROR);
  }
}

// get user by ID
export async function getUserById(userId: string) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error(messages.USER_NOT_FOUND);
    }
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error(messages.INTERNAL_SERVER_ERROR);
  }
}
