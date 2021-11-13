'use strict';

const { server } = require('../src/server');
const supertest = require('supertest');
const mockRequest = supertest(server);
const { db } = require('../src/auth/models/index');

beforeAll(async () => {
    await db.sync();
});

afterAll(async () => {
    await db.drop();
});

describe('Web server', () => {
    it('Should responed 404', async () => {
        const response = await mockRequest.get('/foo');
        expect(response.status).toBe(404);
    });
});

describe('basic Auth', () => {
    it('Signup a user', async () => {
        const response = await mockRequest.post('/signUp').send({
            userName: "hassan",
            password: "saberwrathe"
        });
        expect(response.status).toBe(201);
    });
    test('log in with correct account', async () => {
        const response = await mockRequest.post('/login').auth("hassan", "saberwrathe");
        expect(response.status).toBe(200);
    });
    test('log in with wrong password', async () => {
        const response = await mockRequest.post('/login').auth("hassan", "fojel");
        expect(response.status).toBe(403);
    });
    test('log in not auth account', async () => {
        const response = await mockRequest.post('/login').auth("hamodeh", "meshhamodeh");
        expect(response.status).toBe(403);
    });
});




