import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as userRepository from '../../repositories/userRepository';
import * as authService from '../../services/authService';
import AppError from '../../utils/AppError';

jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../../repositories/userRepository');

describe('authService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('register', () => {
        const users = [ 
                { name: 'Ivan2', email: 'ivan13@mail.ru', password: '1234', role: 'user' },
                { name: 'Ivan3', email: 'ivan14@mail.ru', password: '1234', role: 'user' }
            ]
        it('should return created user', async () => {

            const createdUser = {
                name: 'Ivan',
                email: 'ivan12@mail.ru',
                role: 'user',
                toObject() {
                    return {
                        name: this.name,
                        email: this.email,
                        role: this.role,
                        password: 'hashed'
                    };
                }
            };

            const expectedResult = {
                name: 'Ivan',
                email: 'ivan12@mail.ru',
                role: 'user',
            };

            const hashedPassword = '!@#$';

            (userRepository.create as jest.Mock).mockResolvedValue(createdUser);
            (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);


            const result = await authService.register({
                name: 'Ivan',
                email: 'ivan12@mail.ru',
                password: '1234' 
            })
        
            expect(userRepository.create).toHaveBeenCalledWith({
                name: 'Ivan',
                email: 'ivan12@mail.ru',
                password: '!@#$' 
            });
            expect(result).toEqual(expectedResult);
        })

        it('should throw AppError 404 if user with such email have existed yet', async () => {
            (userRepository.findByEmail as jest.Mock).mockResolvedValue({ email: 'ivan13@mail.ru' });

            await expect(authService.register({
                name: 'Ivan',
                email: 'ivan13@mail.ru',
                password: '1234'
            })).rejects.toThrow(AppError);

            await expect(authService.register({
                name: 'Ivan',
                email: 'ivan13@mail.ru',
                password: '1234'
            })).rejects.toMatchObject({
                statusCode: 400,
                message: 'Email already exist'
            });
        })
    })

    describe('login', () => {

        const users = [ 
                { name: 'Ivan', email: 'ivan12@mail.ru', password: '1234', role: 'user' },
                { name: 'Ivan2', email: 'ivan13@mail.ru', password: '1234', role: 'user' }
            ];

        it('shold return user founded by token', async () => {

            const user = {
                email: 'ivan12@mail.ru',
                password: '1234'
            };

            const returnedUser = {
                _id: "65a8...",
                name: "John",
                email: "john@mail.com",
                password: "$2b$10$..."
            }
            const boolean = true;

            (userRepository.findByEmail as jest.Mock).mockResolvedValue(returnedUser);
            (bcrypt.compare as jest.Mock).mockResolvedValue(boolean);
            (jwt.sign as jest.Mock).mockReturnValue('@123');

            const result = await authService.login(user);

            expect(userRepository.findByEmail).toHaveBeenCalledWith(user.email);
            expect(result).toEqual({ token: '@123' });
        })

        it('should throw if email not found', async () => {
            (userRepository.findByEmail as jest.Mock).mockResolvedValue(null);

            await expect(authService.login({
                email: 'ivan1100@mail.ru',
                password: '1234'
            })).rejects.toThrow(AppError);

            await expect(authService.login({
                email: 'ivan1100@mail.ru',
                password: '1234'
            })).rejects.toMatchObject({
                statusCode: 404,
                message: 'Invalid email or password'
            });
        });

        it('should throw if password is wrong', async () => {
            (userRepository.findByEmail as jest.Mock).mockResolvedValue({ email: 'ivan12@mail.ru', password: '$2b$10$...' });
            (bcrypt.compare as jest.Mock).mockResolvedValue(false);
            
            await expect(authService.login({
                email: 'ivan12@mail.ru',
                password: '1234567'
            })).rejects.toThrow(AppError);

            await expect(authService.login({
                email: 'ivan12@mail.ru',
                password: '1234567'
            })).rejects.toMatchObject({
                statusCode: 404,
                message: 'Invalid email or password'
            });
        });
    })
})


