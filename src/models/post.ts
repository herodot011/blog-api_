import mongoose, { Schema } from 'mongoose';

const postSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category' }
}, { timestamps: true });

export const Post = mongoose.model('Post', postSchema);