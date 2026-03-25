import { Category } from '../models/category';
import { Post } from '../models/post';

export const getAll = async () => {
    return await Category.find();
}

export const create = async (data: any) => {
    return await Category.create(data);
}

export const remove = async (id: string) => {
    return await Category.findByIdAndDelete(id);
}

export const findByCategory = async(id: string) => {
    return await Post.find({ category: id })
        .populate('author', 'name email')
        .populate('category', 'name');
}