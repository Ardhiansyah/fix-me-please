const express = require('express');
const router = express.Router();
var transactionController = require('../controllers/transactions');

router.get('/', transactionsController.all)
router.post('/', transactionsController.create)
router.put('/:id', transactionsController.update)
router.delete('/:id', transactionsController.delete)
