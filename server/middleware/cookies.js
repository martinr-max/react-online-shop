const {
  validateAccessToken,
  validateRefreshToken
} = require("../jwt-token/tokens");
const User = require("../models/user");
const { setTokens, tokenCookies } = require("../jwt-token/tokens");

async function validateTokensMiddleware(req, res, next) {
  const refreshToken = req.headers["x-refresh-token"];
  const accessToken = req.headers["x-access-token"];
  if (!accessToken && !refreshToken) return next();

  const decodedAccessToken = validateAccessToken(accessToken);
  if (decodedAccessToken && decodedAccessToken.user) {
    req.user = decodedAccessToken.user;
    return next();
  }

  const decodedRefreshToken = validateRefreshToken(refreshToken);
  if (decodedRefreshToken && decodedRefreshToken.user) {
    // valid refresh token
    const user = await User.get({ userId: decodedRefreshToken.user.id });
    // valid user and user token not invalidated
    if (!user || user.tokenCount !== decodedRefreshToken.user.count)
    {res.clearCookie("access");
    res.clearCookie("refresh");
      return next();}
    req.user = decodedRefreshToken.user;
    // refresh the tokens
    const userTokens = setTokens(user);
    req.user = decodedRefreshToken.user;
    // update the cookies with new tokens
    const cookies = tokenCookies(userTokens);
    res.cookie(...cookies.access);
    res.cookie(...cookies.refresh);
    return next();
  }
  next();
}

module.exports = {
  validateTokensMiddleware
}