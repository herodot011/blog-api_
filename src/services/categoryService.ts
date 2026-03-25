import * as categoryRepository from '../repositories/categoryRepository';
import AppError from '../utils/AppError';

export const getAll = async () => {
    return await categoryRepository.getAll();
}

export const create = async (data: any) => {
    return await categoryRepository.create(data);
}

export const remove = async (id: string) => {
    const deleted = await categoryRepository.remove(id);
    if(!deleted) throw new AppError('Category not found', 404);
    return deleted;
}

export const findByCategory = async (id: string) => {
    const posts = await categoryRepository.findByCategory(id);
    if(!posts) throw new AppError('Posts by category not found', 404);
    return posts;
}