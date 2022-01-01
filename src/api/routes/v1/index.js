const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const expenseRoute = require('./expenses.route');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/user', userRoute);
router.use('/expense', expenseRoute);

module.exports = router;
