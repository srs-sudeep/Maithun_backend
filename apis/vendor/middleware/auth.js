const jwt = require("jsonwebtoken");
const vendor = require("../models/vendor");
require("dotenv").config();

function authenticateMiddleware(req, res, next) {
  // Function to extract the token value from a cookie string

  function extractTokenValue(tokenString) {
    if (tokenString && typeof tokenString === "string") {
      const tokenIndex = tokenString.indexOf("token=");

      if (tokenIndex !== -1) {
        const tokenStartIndex = tokenIndex + 6;
        const tokenEndIndex = tokenString.indexOf(";", tokenStartIndex);

        if (tokenEndIndex !== -1) {
          const tokenValue = tokenString.substring(
            tokenStartIndex,
            tokenEndIndex
          );
          return tokenValue;
        } else {
          const tokenValue = tokenString.substring(tokenStartIndex);
          return tokenValue;
        }
      } else {
        return null; // 'token=' not found in the string
      }
    } else {
      return null; // Handle the case where tokenString is undefined or not a string
    }
  }

  // Extract the token from the request's cookies
  const token = extractTokenValue(req.headers.cookie);

  // next();
  if (!token) {
    // If no token is provided, return a 401 (Unauthorized) response
    return res.status(200).json({ message: "Please login first" });
  }

  // Verify the token using your secret key
  jwt.verify(token, process.env.secret, (err, user) => {
    if (err) {
      // If the token is invalid or expired, return a 401 (Unauthorized) response
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    const existvendor = vendor.findById(user.userId);

    if (existvendor) {
      console.log("Token verified");
    } else {
      console.log("Token not verified");
    }
    req.body.uId = user.userId;

    next();
  });
}

module.exports = authenticateMiddleware;
