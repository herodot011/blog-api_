import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/AppError';

const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const status = err.status || 'error';
    const message = err.message || 'Internal server error';

    res.status(statusCode).json({
        status,
        message
    })
}


export default errorHandler;