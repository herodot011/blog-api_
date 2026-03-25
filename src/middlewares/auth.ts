import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/AppError';
import jwt from 'jsonwebtoken';

const auth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return next (new AppError('No token provided', 401));
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decoded;
    next();
}

export default auth;