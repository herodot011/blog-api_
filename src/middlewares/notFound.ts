import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/AppError';

const notFound = (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(`Not Found - ${req.originalUrl}`, 404));
};

export default notFound;