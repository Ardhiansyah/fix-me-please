var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Book = require('../models/Book');

var transactionSchema = Schema({
  memberid: String,
  days: String,
  date: { type: Date, default: Date.now() },
  price: Number,
  booklist: [{ type: Schema.Types.ObjectId, ref: 'book' }]
});

transactionSchema.pre('save', function(next) {
  Book.find({ '_id': { $in: this.booklist } }, (err, books) => {
    if (books.length === 0) return next(new Error(`Buku tidak ditemukan`));

    let flag = true;
    let bookTitle = null;

    for (let i = 0; i < books.length; i++) {
      if (books[i].stock == 0) {
        flag = false;
        bookTitle = books[i].title;
        break;
      }
    }

    if (!flag) return next(new Error(`Stock Buku ${bookTitle} Habis`));

    books.forEach(book => {
      book.stock--;

      book.save(err => {
        if (err) return next(new Error(err));
      });
    });

    return next();
  })
})

var Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction
