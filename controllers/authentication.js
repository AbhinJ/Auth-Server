const mongoose = require("mongoose");
const jwt = require("jwt-simple");
const config = require("../config/dev");

const User = mongoose.model("users");

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.JWTsecret);
}

exports.signup = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "You must provide email and password" });
  }
  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    return res.status(422).send({ error: "Email is in use" });
  }

  const user = await new User({
    email,
    password
  }).save();
  res.json({ token: tokenForUser(user) });
};
exports.signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
};
