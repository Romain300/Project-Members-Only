const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const db = require("../db/queries");

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

const createUser = [
    validateUser,

    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("signIn", {errors: errors.array()})
        }

        try {
            console.log("creating new user...");
            const { name, surname, email } = req.body;
            const userExist = await db.getUserByEmail(email);
            if (userExist) {
                return res.status(400).render("signIn", {errors: [{msg: "Email address already used"}]});
            }
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            await db.createUser(name, surname, email, hashedPassword);
            console.log(`New user has been created`);
            return res.status(201).redirect("/logIn");
        } catch (error) {
            return res.status(500).send("something went wrong during user creation");
        } 
    }
];


function getFormSignIn (req,res) {
    res.render("signIn");
};

module.exports = {
    getFormSignIn,
    createUser,
}

