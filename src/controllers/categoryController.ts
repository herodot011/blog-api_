import { Request, Response } from 'express';
import * as categoryService from '../services/categoryService';
import catchAsync from '../utils/catchAsync';

export const getAllCategories = catchAsync(async (req: Request, res: Response) => {
    const categories = await categoryService.getAll();
    res.json(categories);
})

export const createCategory = catchAsync(async (req: Request, res: Response) => {
    const category = await categoryService.create(req.body);
    res.status(201).json(category);
})

export const deleteCategory = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    await categoryService.remove(id);
    res.json({message: 'Category deleted successfully' });
})

export const getPostsByCategory = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const posts = await categoryService.findByCategory(id);
    res.json(posts);
})