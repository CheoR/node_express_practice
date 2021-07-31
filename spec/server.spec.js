const request = require('request');

describe('fetch messages', () => {
 it('should return 200 ok', (done) => {
  request.get('http://localhost:3000/messages', (err, res) => {
   expect(res.statusCode).toEqual(200);
   done();
  });
 });

 it('should return a non-empty list', (done) => {
  request.get('http://localhost:3000/messages', (err, res) => {
   expect(JSON.parse(res.body).length).toBeGreaterThan(0);
   done();
  });
 });
});

describe('fetch messages from specific user', () => {
 it('should return 200 ok', (done) => {
  request.get('http://localhost:3000/messages/browser1', (err, res) => {
   expect(res.statusCode).toEqual(200);
   done();
  });
 });

 it('user name should be browser1', (done) => {
  request.get('http://localhost:3000/messages/browser1', (err, res) => {
   expect(JSON.parse(res.body)[0].name).toEqual('browser1');
   done();
  });
 });

 it('user name should be browser1', (done) => {
  request.get('http://localhost:3000/messages/browser1', (err, res) => {
   expect(JSON.parse(res.body)[0].name).toEqual('browser1');
   done();
  });
 });
});