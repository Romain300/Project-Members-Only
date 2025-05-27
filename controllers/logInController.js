const { body, validationResult } = require("express-validator");
const passport = require("passport");

const validateUser = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email cannot be empty"),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password cannot be empty"),
];

const logUser = [
    validateUser,

    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(401).render("logIn", {errors: errors.array()});
        }
        
        return passport.authenticate("local", {
            successRedirect: "/",
            failureRedirect: "/logIn"
        })(req, res, next)

    }
];


function  getFormLogIn(req,res) {
    res.render("logIn")
};

module.exports = {
    getFormLogIn,
    logUser
}