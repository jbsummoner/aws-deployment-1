/* eslint-disable no-undef */
const request = require('supertest');

const app = require('../../server');

describe('GET /', () => {
  it('responds with a json message', done => {
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, { method: 'GetIndex', payload: 'Serviced', message: '👋🌎🌍🌏' }, done);
  });
});
