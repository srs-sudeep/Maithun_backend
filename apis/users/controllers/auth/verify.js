const express = require("express");

// Example route that requires user login
async function verify(req, res) {
  // If the middleware reached here, the user is logged in
  res.json({ message: "Ok" });
}

module.exports = verify;
