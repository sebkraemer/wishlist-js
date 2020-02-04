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
  bookRouter.route('/books/:bookId') // will deliver the parameter
    .get((req, res) => {
      Book.findById(req.params.bookId, (err, book) => {
        if (err) {
          return res.send(err);
        }
        return res.json(book);
      });
    });

  return bookRouter;
}

module.exports = routes;
