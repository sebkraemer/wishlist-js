function booksController(Book) {
  function post(req, res) {
    const book = new Book(req.body);
    if (!req.body.title) {
      res.status(400);
      return res.send('Title is required');
    }
    book.save(); // save to db
    // return res.status(201).json(book);
    // separate calls now due to mocking
    res.status(201);
    return res.json(book);
  }
  function get(req, res) {
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
  }
  return { post, get };
}

module.exports = booksController;
