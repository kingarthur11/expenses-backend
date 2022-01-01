const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { omit } = require('lodash');
const { authService, userService, tokenService } = require('../services');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);

  return res.status(httpStatus.CREATED).send(omit(user.toJSON(), "password"));
  // res.status(httpStatus.CREATED).json({message: 'Created successfully', user});
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.json({ message: 'Login successfully', user, tokens });
});

module.exports = {
  register,
  login,
};
