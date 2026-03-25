import { Request, Response } from 'express';
import * as postService from '../services/postService';
import catchAsync from '../utils/catchAsync';

export const getAllPosts = catchAsync(async (req: Request, res: Response) => {
    const posts = await postService.getAll();
    res.json(posts);
});

export const getPostById = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const post = await postService.getById(id);
    res.json(post);
});

export const createPost = catchAsync(async (req: Request, res: Response) => {
    const post = await postService.create(req.body);
    res.status(201).json(post);
});

export const updatePost = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const post = await postService.update(id, req.body);
    res.json(post);
});

export const deletePost = catchAsync(async(req: Request, res: Response) => {
    const id = req.params.id as string;
    await postService.remove(id);
    res.json({message: 'Post deleted successfully' });
})
