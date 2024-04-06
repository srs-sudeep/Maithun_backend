async function logout(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logout successful!" });
}

module.exports = logout;
