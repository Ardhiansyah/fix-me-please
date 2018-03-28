const Book = require('../models/Book');

module.exports = {
  all: function(req, res) {
    Book.find(function (err, books) {
      if (err) {
        res.status(500).send({err: err})
      }
      res.status(200).send(books)
    })
  },
  create: function(req, res) {
    var book = new Book(req.body);
    book.save(function (err, result) {
      if (err) {
        res.status(500).send({err: err})
      }
      res.status(201).send(result)
    });
  },
  update: function(req, res) {
    Book.update({ _id: req.params.id }, {
      $set: req.body
    }, function(err, result) {
      if (err) {
        res.status(500).send({err: err})
      }
      res.status(200).send(result)
    });
  },
  delete: function(req, res) {
    Book.remove({ _id: req.params.id }, function (err, result) {
      if (err) {
        res.status(500).send({err: err})
      }
      res.status(200).send(result)
    });
  }
}
