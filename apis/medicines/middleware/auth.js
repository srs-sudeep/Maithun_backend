const jwt = require("jsonwebtoken");
const userInfo = require("../../users/models/userInfo");
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
    return res
      .status(401)
      .json({ message: "Unauthorized: Token not provided" });
  }

  // Verify the token using your secret key
  jwt.verify(token, process.env.secret, async (err, user) => {
    if (err) {
      // If the token is invalid or expired, return a 401 (Unauthorized) response
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    const existUser = await userInfo.findById(user.userId);

    if (existUser) {
      console.log("Token verified");
      req.body.userId = user.userId; // Attach userId to the request for later use in the controller
      next(); // Continue to the next middleware or controller
    } else {
      console.log("Token not verified");
      res.status(401).json({ message: "Unauthorized: User not found" });
    }
  });
}

module.exports = authenticateMiddleware;
