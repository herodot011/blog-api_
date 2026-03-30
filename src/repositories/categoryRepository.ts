import { Category } from '../models/category';

export const getAll = async () => {
    return await Category.find();
}

export const create = async (data: any) => {
    return await Category.create(data);
}

export const remove = async (id: string) => {
    return await Category.findByIdAndDelete(id);
}
