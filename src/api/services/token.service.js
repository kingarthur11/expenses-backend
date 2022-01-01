const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('../../config/vars');
const { Token } = require('../model');
const ApiError = require('../utils/ApiError');

const generateToken = (userId, expires, secret = config.jwt.secret) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
  };
  return jwt.sign(payload, secret);
};

const saveToken = async (token, userId, expires, type) => {
  const tokenDoc = await Token.create({
    token,
    user: userId,
    expires: expires.toDate(),
    type,
  });
  return tokenDoc;
};

const verifyToken = async (token, type) => {
  const payload = jwt.verify(token, config.jwt.secret);
  const tokenDoc = await Token.findOne({ token, type, user: payload.sub });
  if (!tokenDoc) {
    throw new Error('Token not found');
  }
  return tokenDoc;
};

const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  const accessToken = generateToken(user.id, accessTokenExpires);

  const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
  const refreshToken = generateToken(user.id, refreshTokenExpires);
  // await saveToken(refreshToken, (user.id).toString(), refreshTokenExpires, 'refresh');

  return {
    token: accessToken,
    // access: {
    //   token: accessToken,
    //   expires: accessTokenExpires.toDate(),
    // },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

module.exports = {
  generateToken,
  saveToken,
  verifyToken,
  generateAuthTokens,
};
