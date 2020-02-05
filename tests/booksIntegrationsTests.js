require('should');

const request = require('supertest');
const mongoose = require('mongoose');

// tell the app we're running test mode so that a test DB is used
process.env.ENV = 'Test';

// needs app to go through its motions
const app = require('../app.js');

const Book = mongoose.model('Book');
const agent = request.agent(app);

describe('Book Crud Test', () => {
  it('should allow a book to be posted and return read and _id', (done) => {
    const bookPost = { title: 'My Book', author: 'Seb', genre: 'Fiction' };
    agent.post('/api/books')
      .send(bookPost)
      .expect(200)
      .end((err, results) => {
        // console.log(results); // debug the thing
        results.body.read.should.equal(false);
        results.body.should.have.property('_id');
        done();
      });
  });

  afterEach((done) => {
    Book.deleteMany({}).exec();
    done();
  });

  after((done) => {
    mongoose.connection.close();
    // notice how the listening server object was just attached to app in app.js!
    app.server.close();
    done();
  });
});
