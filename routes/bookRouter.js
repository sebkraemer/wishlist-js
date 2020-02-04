/* eslint-disable no-param-reassign */
const express = require('express');

function routes(Book) {
  const bookRouter = express.Router();
  bookRouter.route('/books')
    .post((req, res) => {
      const book = new Book(req.body);
      console.log(book);
      book.save(); // save to db
      return res.status(201).json(book);
    })
    .get((req, res) => {
      const query = {};
      if (req.query.genre) { // only genre filter
        query.genre = req.query.genre; // todo why does it allow this with const query?
      }
      Book.find(query, (err, books) => {
        if (err) {
          return res.send(err);
        }
        return res.json(books);
      });
    });
  bookRouter.use('/books/:bookId', (req, res, next) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) {
        return res.send(err);
      }
      if (book) {
        req.book = book;
        return next();
      }
      return res.sendStatus(404);
    });
  });
  bookRouter.route('/books/:bookId') // will deliver the parameter
    .get((req, res) => res.json(req.book))
    .put((req, res) => {
      const { book } = req;
      book.title = req.body.title;
      book.author = req.body.author;
      book.genre = req.body.genre;
      book.read = req.body.read;
      //req.book.save((err) => {
      book.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(book);
      });
    })
    .patch((req, res) => {
      const { book } = req; // necessary??
      // eslint-disable-next-line no-underscore-dangle
      if (req.body._id) {
        // eslint-disable-next-line no-underscore-dangle
        delete req.body._id;
      }

      Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const value = item[1];
        book[key] = value;
      });
      req.book.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(book);
      });
      //book.save(); // same?!

    })
    .delete((req, res) => {
      req.book.remove((err) => {
        if (err) {
          return res.send(err);
        }
        return res.sendStatus(204); // removed
      });
    });

  return bookRouter;
}

module.exports = routes;
