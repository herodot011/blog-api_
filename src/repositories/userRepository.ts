import { User } from '../models/user';

export const findByEmail = async (email: string) => {
    return await User.findOne({ email });
}

export const create = async (data: any) => {
    return await User.create(data);
}