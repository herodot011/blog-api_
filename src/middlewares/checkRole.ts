import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/AppError';

const checkRole = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const userRole = (req as any).user?.role;
        if(!roles.includes(userRole)) {
            throw new AppError('Access denied', 403);
        }
        next();
    };
};

export default checkRole;