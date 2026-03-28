import AppError from "../../utils/AppError";
import * as categoryService from '../../services/categoryService';
import * as categoryRepository from '../../repositories/categoryRepository';

jest.mock('../../repositories/categoryRepository');

describe('categoryService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getAll', () => {
        it('should return all categories', async() => {
        const categories = ['one', 'second'];
        (categoryRepository.getAll as jest.Mock).mockResolvedValue(categories);

        const result = await categoryService.getAll();

        expect(categoryRepository.getAll).toHaveBeenCalledTimes(1);
        expect(result).toEqual(categories);
        })
    })

    describe('create', () => {
        it('should create a category object and return it', async() => {
            const category = ({
                name: "Node.js"
            });

            (categoryRepository.create as jest.Mock).mockResolvedValue(category);

            const result = await categoryService.create(category);

            expect(categoryRepository.create).toHaveBeenCalledWith(category);
            expect(result).toEqual(category);
        })
    })

    describe('remove', () => {
        it('should delete category by id', async () => {
            const categories = [
                {id: '1', name: 'Node.js'}, 
                {id: '2', name: 'Express'}
            ];

            const deleted = { id: '1', name: 'Node.js' };

            (categoryRepository.remove as jest.Mock).mockResolvedValue(deleted);

            const result = await categoryService.remove('1');

            expect(categoryRepository.remove).toHaveBeenCalledWith('1');
            expect(result).toEqual(deleted);
        })
        it('should throw error if category not found', async() => {
            (categoryRepository.remove as jest.Mock).mockResolvedValue(null);

            await expect(categoryService.remove('33')).rejects.toThrow(AppError);
            await expect(categoryService.remove('33')).rejects.toMatchObject({
                statusCode: 404,
                message: 'Category not found'
            });
        })
    })

    describe('findByCategory', () => {
        it('should return post by categoryId', async() => {

            const foundedPosts = [
                {
                    id: '1',
                    title: 'Hello',
                    author: {
                        id: '10',
                        name: 'Ivan',
                        email: 'ivan12@mail.ru'
                    },
                    category: {
                        id: '1234',
                        name: 'Node.js'
                    }
                },
                {
                    id: '3',
                    title: 'Hello!',
                    author: {
                        id: '12',
                        name: 'Ivan2',
                        email: 'ivan13@mail.ru'
                    },
                    category: {
                        id: '1234',
                        name: 'Node.js'
                    }
                }
            ];

            (categoryRepository.findByCategory as jest.Mock).mockResolvedValue(foundedPosts);

            const result = await categoryService.findByCategory('1234');

            expect(categoryRepository.findByCategory).toHaveBeenCalledWith('1234');
            expect(result).toEqual(foundedPosts);
        })

        it('should throw error if posts by category not found', async() => {
            (categoryRepository.findByCategory as jest.Mock).mockResolvedValue(null);

            await expect(categoryService.findByCategory('123456')).rejects.toThrow(AppError);
            await expect(categoryService.findByCategory('123456')).rejects.toMatchObject({
                statusCode: 404,
                message: 'Posts by category not found'
            })
        })
    })
})