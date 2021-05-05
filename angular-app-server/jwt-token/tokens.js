const jwt  = require("jsonwebtoken");


function  setTokens(user){
  const sevenDays = 60 * 60 * 24 * 7 * 1000;
  const fifteenMins = 60 * 15 * 1000;
  const accessUser = {
    id: user.id
  };
  const accessToken = jwt.sign(
    { user: accessUser },
    "mysupersecretaccesskey",
    {
      expiresIn: fifteenMins
    }
  );
  const refreshUser = {
    id: user.id,
    count: user.tokenCount
  };
  const refreshToken = jwt.sign(
    { user: refreshUser },
    "mysupersecretrefreshkey",
    {
      expiresIn: sevenDays
    }
  );

  return { accessToken, refreshToken };
}

function validateAccessToken(token) {
    try {
      return jwt.verify(token, "mysupersecretaccesskey");
    } catch {
      return null;
    }
  }
  

function validateRefreshToken(token){
    try {
      return jwt.verify(token, "mysupersecretrefreshkey");
    } catch {
      return null;
    }
  }


 function tokenCookies({ accessToken, refreshToken }) {
    const cookieOptions = {
      httpOnly: true
      // secure: true, //for HTTPS only
      // domain: "your-website.com",
      // SameSite: None
    };
    return {
      access: ["access", accessToken, cookieOptions],
      refresh: ["refresh", refreshToken, cookieOptions]
    };
  }

  module.exports = {
    setTokens,
    tokenCookies,
    validateAccessToken,
    validateRefreshToken
  };