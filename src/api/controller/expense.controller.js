const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { expenseService } = require('../services');

const createExpense = catchAsync(async (req, res) => {
  const expense = await expenseService.createxpense(req.body);
  res.status(httpStatus.CREATED).json({message: 'Created successfully', expense});
});

const getAllExpense = catchAsync(async (req, res) => {
    const expense = await expenseService.getAllexpense();
    res.send(expense);
  });

const getOneExpense = catchAsync(async (req, res) => {
    const expense = await expenseService.getExpenseById(req.params.expenseId);
    if (!expense) {
      throw new ApiError(httpStatus.NOT_FOUND, 'expense not found');
    }
    res.send(expense);
  });

const updateExpense = catchAsync(async (req, res) => {
    const expense = await expenseService.updateExpense(req.params.expenseId, req.body);
    res.send(expense);
  });

const deleteExpense = catchAsync(async (req, res) => {
    await expenseService.deleteExpense(req.params.expenseId);
    res.json({message: 'Deleted successfully'});
    // return res.send("Deleted successfully");
  });

module.exports = {
    createExpense,
    getAllExpense,
    getOneExpense,
    updateExpense,
    deleteExpense
};
