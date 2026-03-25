import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import * as authService from '../services/authService';

export const register = catchAsync(async(req: Request, res: Response) => {
    const user = await authService.register(req.body);
    res.status(201).json({ status: 'success', data: user });
});

export const login = catchAsync(async(req: Request, res: Response) => {
    const data = await authService.login(req.body);
    res.status(200).json({ status: 'success', data })
})