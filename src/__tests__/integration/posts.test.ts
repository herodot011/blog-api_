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

afterAll(async () => {
    await testDb.disconnect();
})

afterEach(async () => {
    await testDb.clearDatabase();
})


describe('GET /posts', () => {
    it('should return 200 and array of posts', async () => {
        const res = await request(app).get('/posts');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
})

describe('GET /posts/:id', () => {
    it('should return 200 and post object', async () => {
        const { token, userId } = await getAuthToken();

        const created = await request(app)
            .post('/posts')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Test Post', content: 'Hello World', author: userId });

        const res = await request(app)
            .get(`/posts/${created.body._id}`);

        expect(res.status).toBe(200);
        expect(res.body._id).toBe(created.body._id);
    });
});

describe('POST /posts', () => {
    it('should return 401 without token', async () => {
        const res = await request(app)
            .post('/posts')
            .send({ title: 'Test', content: 'Content' });
        expect(res.status).toBe(401);
    })

    it('should create post with valid token and return 201', async () => {
        const { token, userId } = await getAuthToken();

        const res = await request(app)
            .post('/posts')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Test Post', content: 'Hello World', author: userId })

        expect(res.status).toBe(201);
        expect(res.body.title).toBe('Test Post');
    });
});


describe('DELETE /posts/:id', () => {
    it('should return 401 without token', async () => {
        const res = await request(app).delete('/posts/123456789012');
        expect(res.status).toBe(401);
    });

    it('should return 403 without admin role', async () => {
        const { token } = await getAuthToken();
        const res = await request(app)
            .delete('/posts/507f1f77bcf86cd799439011')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(403);
    });
});

describe('PATCH /posts/:id', () => {
    it('should return 401 without token', async () => {
        const res = await request(app)
            .patch('/posts/507f1f77bcf86cd799439011')
            .send({ title: 'Updated' });
        expect(res.status).toBe(401);
    });

    it('should return 200 and updated post', async () => {
        const { token, userId } = await getAuthToken();

        const created = await request(app)
            .post('/posts')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Test Post', content: 'Hello World', author: userId });

        const res = await request(app)
            .patch(`/posts/${created.body._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Updated Title' });

        expect(res.status).toBe(200);
        expect(res.body.title).toBe('Updated Title');
    });
});