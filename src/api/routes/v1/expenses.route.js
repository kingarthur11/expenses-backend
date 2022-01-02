const express = require('express');
const expenseController = require('../../controller/expense.controller');
const {verifyToken} = require('../../middleware/auth')


const router = express.Router();

router.get('/getone/:expenseId', verifyToken.verify, expenseController.getOneExpense);
router.get('/getall', expenseController.getAllExpense);
router.post('/create', verifyToken.verify, expenseController.createExpense);
router.put('/update/:expenseId', verifyToken.verify, expenseController.updateExpense);
router.delete('/delete/:expenseId', verifyToken.verify, expenseController.deleteExpense);

module.exports = router;