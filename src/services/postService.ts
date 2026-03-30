import * as postRepository from '../repositories/postRepository';
import AppError from '../utils/AppError';

export const getAll = async () => {
    return await postRepository.findAll();
}

export const getById = async (id: string) => {
    const post = await postRepository.findById(id);
    if(!post) throw new AppError('Post not found', 404);
    return post;
}

export const create = async (data: any) => {
    return await postRepository.create(data);
}

export const update = async (id: string, data: any) => {
    const post = await postRepository.update(id, data);
    if(!post) throw new AppError('Post not found', 404);
    return post;
}

export const remove = async (id: string) => {
    const deleted = await postRepository.remove(id);
    if(!deleted) throw new AppError('Post not found', 404);
    return deleted;
}

export const findByCategory = async (id: string) => {
    const posts = await postRepository.findByCategory(id);
    if(!posts) throw new AppError('Posts by category not found', 404);
    return posts;
}