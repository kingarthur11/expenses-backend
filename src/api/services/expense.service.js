const httpStatus = require('http-status');
const { Expense } = require('../model');
const ApiError = require('../utils/ApiError');

const createxpense = async (expenseBody) => {
  const expenseDate = await getExpenseDate(expenseBody.dateData);
  const expenseTitle = await getExpenseTitle(expenseBody.title);
  if (expenseTitle && expenseDate) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'expense already exist');
  }
  const expenseData = await Expense.create(expenseBody);
  return expenseData;
};

const getExpenseTitle = async (title) => {
  return Expense.findOne({ title });
};

const getExpenseDate = async (dateData) => {
  return Expense.findOne({ dateData });
};

const getExpenseById = async (id) => {
  return Expense.findById(id);
};

const getAllexpense = async () => {
  return Expense.find({});
};

const updateExpense = async (expenseBody, id) => {
    return Expense.findOneAndUpdate( expenseBody, id );
  };

const deleteExpense = async (id) => {
    return Expense.findByIdAndRemove(id);
  };

module.exports = {
    createxpense,
    getExpenseById,
    getAllexpense,
    updateExpense,
    deleteExpense
};
