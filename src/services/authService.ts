import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as userRepository from '../repositories/userRepository';
import AppError from '../utils/AppError';

export const register = async (data: any) => {
    const { name, email, password } = data;

    const existing = await userRepository.findByEmail(email);
    if(existing) throw new AppError('Email already exist', 400);

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userRepository.create({ name, email, password: hashedPassword });

    const userObj = user.toObject();
    delete (userObj as any).password;
    return userObj;
}

export const login = async (data: any) => {
    const { email, password } = data;

    const user = await userRepository.findByEmail(email);
    if(!user) throw new AppError('Invalid email or password', 404);

    const isCorrect = await bcrypt.compare(password, user.password);
    if(!isCorrect) throw new AppError('Invalid email or password', 404);

    const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role},
        process.env.JWT_SECRET as string,
        { expiresIn: '7d' }
    );
    
    return { token };
};