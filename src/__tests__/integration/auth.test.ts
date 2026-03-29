import request from 'supertest';
import app from '../../app';
import * as testDb from '../helpers/testDb';

beforeAll(async () => {
    await testDb.connect();
});

afterAll(async () => {
    await testDb.disconnect();
})

afterEach(async () => {
    await testDb.clearDatabase();
})

describe('POST /auth/register', () => {
    it('should return 400 if email already exist', async() => {
        await request(app)
            .post('/auth/register')
            .send({ name: 'Ivan', email: 'ivan@mail.ru', password: '123' });
        
        const res = await request(app)
            .post('/auth/register')
            .send({ name: 'Ivan', email: 'ivan@mail.ru', password: '123' });
        
        expect(res.status).toBe(400);
    })

    it('should return 201 and object of user', async() => {
        const res = await request(app)
            .post('/auth/register')
            .send({ name: 'Ivan', email: 'ivan@mail.ru', password: '123' });
        expect(res.status).toBe(201);
        expect(res.body.data.name).toBe('Ivan');
    })
})

describe('POST /auth/login', () => {
    it('should return 404 if email not found', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({ email: 'notexist@mail.ru', password: '123'});
        expect(res.status).toBe(404);
    });

    it('should return 404 if password is wrong', async () => {
        await request(app)
            .post('/auth/register')
            .send({ name: 'Ivan', email: 'ivan@mail.ru', password: '123' });
        
        const res = await request(app)
            .post('/auth/login')
            .send({ email: 'ivan@mail.ru', password: '123456' });
        
        expect(res.status).toBe(404);
    })

    it('should return 200 and object of token', async () => {
        await request(app)
            .post('/auth/register')
            .send({ name: 'Ivan', email: 'ivan@mail.ru', password: '123' });
        
        const res = await request(app)
            .post('/auth/login')
            .send({ email: 'ivan@mail.ru', password: '123' });
        expect(res.status).toBe(200);
        expect(res.body.data.token).toBeDefined();
    })
})