const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  // const isLoggedIn = req.get("Cookie").trim().split("=")[1] === "true";
  // console.log(isLoggedIn);
  console.log(req.session.isLoggedIn);
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  //setting a cookie
  // max=age=10 (10secs and cookie will go away from client's browser)
  //Domain='server'
  //Secure //cookie will only be available in https not in http
  //HttpOnly
  // res.setHeader("Set-Cookie", "loggedIn=true"); //this will set a cookie with loggedIn variable to true

  User.findById("65704bd15f9c3a9ccf14ced2")
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      //when session is saved then please redirect the page
      req.session.save((err) => {
        console.log(err);
        res.redirect("/");
      });
    })
    .catch((err) => console.log(err));
};

//when logout button is clicked, we want to delete the session and cookie
exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};

exports.postSignup = (req, res, next) => {};
