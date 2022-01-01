const httpStatus = require('http-status');
const _ = require("lodash"); 
// const { omit } = require('lodash');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const getAllUser = catchAsync(async (req, res) => {
  const user = await userService.getAllUsers();
  res.send(user);
});

const getOneUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUser(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUser(req.params.userId);
  return res.send("Deleted successfully");
});


module.exports = {
  getAllUser,
  getOneUser,
  updateUser,
  deleteUser
};
