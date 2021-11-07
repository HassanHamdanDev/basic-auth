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

// describe('basic Auth', () => {
//     it('Signup a user', async () => {
//         const response = await mockRequest.post('/signUp').send({
//             userName: "hassan",
//             password: "saberwrathe"
//         });
//         expect(response.status).toBe(201);
//     });
//     it('login ', async () => {
//         const response = await mockRequest.post('/login');
//         expect(response.status).toBe(201);
//     });
// });




