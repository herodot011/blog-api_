import * as postRepository from '../../repositories/postRepository';
import { create } from '../../services/postService';

jest.mock('../../repositories/postRepository');

describe('PostService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        it('should create a post and return it', async () => {
            const inputData = { title: 'Test Post', content: 'Hello World' };
            const expectedPost = { _id: '123', ...inputData };

            (postRepository.create as jest.Mock).mockResolvedValue(expectedPost);

            const result = await create(inputData);

            expect(postRepository.create).toHaveBeenCalledWith(inputData);
            expect(result).toEqual(expectedPost);
        });
        
        it('should throw an error if repository fails', async () => {
            const inputData = { title: 'Test Post', content: 'Hello World' };

            (postRepository.create as jest.Mock).mockRejectedValue(new Error('DB error'));

            await expect(create(inputData)).rejects.toThrow('DB error');
        })
    });
});