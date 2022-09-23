'use strict';

const supertest = require('supertest');
const { app } = require('../src/server');
const { sequelizeDatabase } = require('../src/models');
const request = supertest(app);

beforeAll(async () => {
  await sequelizeDatabase.sync();
});

afterAll(async () => {
  await sequelizeDatabase.drop();
});

describe('API Server', () => {
  it('handles invalid requests', async () => {
    const response = await request.get('/foo');
    expect(response.status).toEqual(404);
  });
  it('handles errors', async () => {
    const response = await request.get('/bad');
    expect(response.status).toEqual(500);
    expect(response.body.route).toEqual('/bad');
    expect(response.body.message).toEqual('this is a bad route');

  });
  it('handles root path', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBeTruthy();
    expect(response.text).toEqual('Hello World');

  });
});

describe('Test /cats endpoint', () => {
  test('getting all cats', async () => {
    const response = await request.get('/cats');
    expect(response.status).toEqual(200);
    expect(response.body[0]).toBeUndefined();
  });

  test('Creating a cat', async () => {
    let response = await request.post('/cats').send({
      name: 'bucky',
    });
    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('bucky');
  });

  test('Get a cat using id', async () => {
    const response = await request.get('/cats/1');
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('bucky');
  });

  test('Updating a cat', async () => {
    let response = await request.put('/cats/1');
    expect(response.status).toEqual(200);
  });

  test('Deleting a cat', async () => {
    let response = await request.delete('/cats/1');
    expect(response.status).toEqual(200);
  });
});

describe('Test /clothes endpoint', () => {
  test('getting all clothes', async () => {
    const response = await request.get('/clothes');
    expect(response.status).toEqual(200);
  });

  test('Creating a clothes', async () => {
    let response = await request.post('/clothes').send({
      name: 'nike',
      color: 'blue',
      size: 'large',
    });
    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('nike');
    expect(response.body.color).toEqual('blue');
    expect(response.body.size).toEqual('large');
  });

  test('Get clothes by id', async () => {
    const response = await request.get('/clothes/1');
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('nike');
    expect(response.body.color).toEqual('blue');
    expect(response.body.size).toEqual('large');
  });

  test('Update clothes', async () => {
    let response = await request.put('/clothes/1');
    expect(response.status).toEqual(200);
  });

  test('Deleting clothes', async () => {
    await request.delete('/clothes/1');
    let response = await request.delete('/clothes/1');
    expect(response.status).toEqual(200);
  });
});
