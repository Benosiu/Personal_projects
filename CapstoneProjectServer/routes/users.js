const router = require("express").Router();
const express = require("express");
const app = express();


const passport = require("passport");
const LocalStrategy = require("passport-local");


// BLUEPRINTS
const UserModel = require("../models/User");

router.use(
  require("express-session")({
    secret: "Blah blah blah", 
    resave: false, 
    saveUninitialized: false, 
  })
);
router.use(passport.initialize());
router.use(passport.session());
passport.use(new LocalStrategy(UserModel.authenticate()));
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

router.get("/", (req, res) => {
  res.redirect("/home");
});

router.get("/home", (req, res) => {
  res.render("login.ejs");
});


router.get("/signup", (req, res) => {
  res.render("signup.ejs");
});

router.post("/signup", (req, res) => {
  const newUser = new UserModel({ 
    username: req.body.username, 
    email: req.body.email,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    bio: req.body.bio,
    gender: req.body.gender,
    website: req.body.website,
    profile: {
      profileimg: ''
    }
  });
  UserModel.register(newUser, req.body.password, function (err, user) {
    if (err) {
      console.log(err);
      return res.render("signup.ejs");
    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/postHome");
      });
    }
  })
});

router.get("/login", (req, res) => {
  res.render("login.ejs");
});

router.post("/login",passport.authenticate("local", {
      successRedirect: "/postHome",
      failureRedirect: "/login",
  }),
  function (req, res) {
    // We don't need anything in our callback function
    /* req.session.regenerate(function (err) {
      if (err) next(err)
  
      // store user information in session, typically a user id
      req.session.user = req.body.username
  
      // save the session before redirection to ensure page
      // load does not happen before session is saved
      req.session.save(function (err) {
        if (err) return next(err)
        res.redirect('/')
      })
    }) */
  }
);

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});



module.exports = router;