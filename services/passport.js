const passport = require("passport");
const mongoose = require("mongoose");
const config = require("../config/dev");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");

const User = mongoose.model("users");

const localOptions = { usernameField: "email" };

const localLogin = new LocalStrategy(
  localOptions,
  async (email, password, done) => {
    const user = await User.findOne({ email: email });
    if (!user) {
      return done(null, false);
    }
    user.comparePassword(password, function(err, isMatch) {
      if (err) {
        return done(err);
      }
      if (!isMatch) {
        return done(null, false);
      }

      return done(null, user);
    });
  }
);

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: config.JWTsecret
};

const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  const user = await User.findById(payload.sub);
  if (user) {
    done(null, user);
  }
  done(null, false);
});

passport.use(jwtLogin);
passport.use(localLogin);
