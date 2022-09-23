'use strict';

const supertest = require('supertest');
const { app } = require('../src/server');
const request = supertest(app);



describe('Validator', () => {
  it('404 on a bad route', async() => {
    const response = await request.get('/wrong');
    expect(response.status).toEqual(404);
  });

  it('sends 500 if no name in the query string', async() => {
    const response = await request.get('/person?name=');
    expect(response.status).toEqual(500);
  });

  it('sends 200 if the name is in the query string', async() => {
    const response = await request.get('/person?name=fred');
    expect(response.status).toEqual(200);
  });

  it('given an name in the query string, the output object is correct', async() => {
    const response = await request.get('/person?name=fred');
    expect(response.body).toHaveProperty('name');
  });
});


