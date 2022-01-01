const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const expenseSchema = mongoose.Schema(
  {
    _id: Number,
    title: {
        type: String,
        required: true,
        trim: true,
    },
    expense_type: {
        type: String,
        required: true,
        trim: true,
    },
    dateData: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
        type: Number,
        required: true,
        trim: true,
    },
  },
  {
    timestamps: true,
  }
);

expenseSchema.plugin(AutoIncrement, {id: 'expense_id', inc_field: '_id'});
const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
