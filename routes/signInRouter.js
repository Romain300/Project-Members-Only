const { Router } = require("express");
const { getFormSignIn } = require("../controllers/signInController");
const { body, validationResult } = require("express-validator");

const validateUser = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name can not be empty"),
    body("surname")
        .trim()
        .notEmpty()
        .withMessage("Surname can not be empty"),
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email can not be empty")
        .isEmail()
        .withMessage("Email must be valid"),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password can not be empty"),
    body("c_password")
        .trim()
        .notEmpty()
        .withMessage("Confirm password can not be empty")
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Password and Confirm password must match")
            }
            return true;
        })
];

//include query to pass it to db
const signInRouter = Router();
signInRouter.get("/", getFormSignIn);

module.exports = signInRouter;
 