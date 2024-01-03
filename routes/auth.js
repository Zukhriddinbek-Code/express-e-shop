const express = require("express");

const { check, body } = require("express-validator");

const User = require("../models/user");

const authController = require("../controllers/auth");

const router = express.Router();

router.get("/login", authController.getLogin);

router.get("/signup", authController.getSignup);

router.get("/reset", authController.getReset);

router.get("/reset/:token", authController.getNewPassword);

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email address")
      .custom((value, { req }) => {
        //checking for user email existence asynchronously
        return User.findOne({ email: value }).then((user) => {
          if (!user) {
            return Promise.reject("No email found with this email address");
          }
        });
      }),
  ],
  authController.postLogin
);

router.post("/logout", authController.postLogout);

router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email address!")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject(
              "Already have an account with this Email! Try with another one!"
            );
          }
        });
      }),
    //default error message for all validators
    body("password", "Please enter 5 chars and only numbers and text")
      .isLength({ min: 5 })
      .isAlphanumeric(),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password does not match!");
      }
      return true;
    }),
  ],
  authController.postSignup
);

router.post("/reset", authController.postReset);

router.post("/new-password", authController.postNewPassword);

module.exports = router;
