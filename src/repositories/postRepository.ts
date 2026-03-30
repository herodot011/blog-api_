import { Post } from '../models/post';

export const findAll = async () => {
    return await Post.find()
        .populate('author', 'name email')
        .populate('category', 'name');
}

export const findById = async (id: string) => {
    return await Post.findById(id)
        .populate('author', 'name email')
        .populate('category', 'name');
}

export const create = async (data: any) => {
    return await Post.create(data);
}

export const update = async (id: string, data: any) => {
    return await Post.findByIdAndUpdate(id, data,{ returnDocument: 'after' } );
}

export const remove = async (id: string) => {
    return await Post.findByIdAndDelete(id);
}

export const findByCategory = async(id: string) => {
    return await Post.find({ category: id })
        .populate('author', 'name email')
        .populate('category', 'name');
}