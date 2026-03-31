import request from 'supertest';
import app from '../../app';
import * as testDb from '../helpers/testDb';

const getAuthToken = async () => {
    const registerRes = await request(app)
        .post('/auth/register')
        .send({ name: 'Test User', email: 'test@mail.com', password: '123456' });

    const res = await request(app)
        .post('/auth/login')
        .send({ email: 'test@mail.com', password: '123456' });
    
    return {
        token: res.body.data.token,
        userId: registerRes.body.data._id
    };
};

beforeAll(async () => {
    await testDb.connect();
});

afterAll(async() => {
    await testDb.disconnect();
});

afterEach(async() => {
    await testDb.clearDatabase();
})

describe ('GET /categories', () => {
    it('should return array of categories', async() => {
        const res = await request(app).get('/categories');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});

describe('GET /categories/id/posts', () => {

    it('should return array of posts by category', async() => {
        const { token, userId } = await getAuthToken();
        const category = await request(app)
            .post('/categories')
            .send({ name: 'Node.js' });

        for (let i = 1; i < 5; i++) {
            await request(app)
                .post('/posts')
                .set('Authorization', `Bearer ${token}`)
                .send({ title: 'Test', content: 'Content', category: 'category.body.    _id', author: userId });
        }

        const res = await request(app).get(`/categories/${ category.body._id }/posts`);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    })
});

describe ('POST /categories', () => {
    it('should return object of category', async () => {
        const res = await request(app)
            .post('/categories')
            .send({ name: 'Node.js'});
        
        expect(res.status).toBe(201);
        expect(res.body.name).toBe('Node.js');
    })
})

describe ('DELETE /categories/:id', () => {
    it('should return object of deleted category', async () => {
        const created = await request(app)
            .post('/categories')
            .send({ name: 'Node.js' });

        const res = await request(app).delete(`/categories/${created.body._id}`);
        expect(res.status).toBe(200);
    })
})