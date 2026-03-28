import * as postRepository from '../../repositories/postRepository';
import * as postService from '../../services/postService';
import AppError from '../../utils/AppError';

jest.mock('../../repositories/postRepository');

describe('PostService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    }); 

    describe('getAll', () => {
        it('should return all posts', async() => {
            const mockPosts = [{ _id: '1', title: 'Post 1' }];
            (postRepository.findAll as jest.Mock).mockResolvedValue(mockPosts);

            const result = await postService.getAll();

            expect(postRepository.findAll).toHaveBeenCalledTimes(1);
            expect(result).toEqual(mockPosts);
        });
    });

    describe('getById', () => {
        it('should return a post by id', async() => {
            const mockPost = { _id: "123", title: "Test"};
            (postRepository.findById as jest.Mock).mockResolvedValue(mockPost);

            const result = await postService.getById('123');

            expect(postRepository.findById).toHaveBeenCalledWith('123');
            expect(result).toEqual(mockPost);
        });

        it('should throw AppError 404 if post not found', async() => {
            (postRepository.findById as jest.Mock).mockResolvedValue(null);

            await expect(postService.getById('999')).rejects.toThrow(AppError);
            await expect(postService.getById('999')).rejects.toMatchObject({
                statusCode: 404,
                message: 'Post not found',
            });
        });
    });

    describe('create', () => {
        it('should create a post and return it', async () => {
            const inputData = { title: 'Test Post', content: 'Hello World' };
            const expectedPost = { _id: '123', ...inputData };

            (postRepository.create as jest.Mock).mockResolvedValue(expectedPost);

            const result = await postService.create(inputData);

            expect(postRepository.create).toHaveBeenCalledWith(inputData);
            expect(result).toEqual(expectedPost);
        });
        
        it('should throw an error if repository fails', async () => {
            (postRepository.create as jest.Mock).mockRejectedValue(new Error('DB error'));

            await expect(postService.create({})).rejects.toThrow('DB error');
        })
    });

    describe('update', () => {
        it('should update and return the post', async() => {
            const updated = { _id: '123', title: 'Updated' };
            (postRepository.update as jest.Mock).mockResolvedValue(updated);

            const result = await postService.update('123', {title: '123'});

            expect(postRepository.update).toHaveBeenCalledWith('123', {title: '123'});
            expect(result).toEqual(updated);
        })

        it('should throw AppError 404 if post not found', async () => {
            (postRepository.update as jest.Mock).mockResolvedValue(null);

            await expect(postService.update('999', {})).rejects.toMatchObject({
                statusCode: 404,
            });
        });
    });

    describe('remove', () => {
        it('should delete and return the post', async () => {
            const deleted = {_id: '123', title: 'toDelete'};
            (postRepository.remove as jest.Mock).mockResolvedValue(deleted);

            const result = await postService.remove('123');

            expect(postRepository.remove).toHaveBeenCalledWith('123');
            expect(result).toEqual(deleted);
        })

        it('should throw AppError 404 if post not found', async () => {
            (postRepository.remove as jest.Mock).mockResolvedValue(null);

            await expect(postService.remove('999')).rejects.toMatchObject({
                statusCode: 404,
            });
        });
    });
});