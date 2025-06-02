const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

async function getFormMember(req, res) {
    return res.render("join", { user: req.user });
};

const validateUser = [
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password, cannot be empty")
        .custom((value) => {
            if(value !== "OneOfUs") {
                throw new Error("Password is not correct");
            }
            return true;
        })
];

const updateMembership = [
    validateUser,

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(401).render("join", {
                user: req.user,
                errors: errors.array(),
            });
        }
        try {
            console.log("updating membershipt")
            await db.updateMembership(req.user.id);
            console.log("membership updated");
            return res.status(201).redirect("/");
        } catch(error) {
            return res.status(500).send("something went wrong during membership's update");
        }
    }
];

module.exports = {
    getFormMember,
    updateMembership,
};