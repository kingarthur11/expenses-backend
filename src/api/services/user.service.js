const httpStatus = require('http-status');
const { User } = require('../model');
const ApiError = require('../utils/ApiError');

const createUser = async (userBody) => {
  const password = userBody.password;
  const confirmPassword = userBody.confirm_password;
  const userEmail = await getUserData(userBody.email);
  if (password !== confirmPassword) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'password does not match');
  }
  if (userEmail) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'email is already taken');
  }
  const user = await User.create(userBody);
  return user;
};

const getUserById = async (id) => {
  return User.findById(id);
};

const getUserData = async (email) => {
  return User.findOne({ email });
};

const getAllUsers = async () => {
  return User.find();
};

const updateUser = async (userBody, id) => {
  return User.findOneAndUpdate( userBody, id );
};

const deleteUser = async (id) => {
  return Expense.findByIdAndDelete(id);
};

module.exports = {
  createUser,
  getUserById,
  getUserData,
  getAllUsers,
  updateUser,
  deleteUser
};
