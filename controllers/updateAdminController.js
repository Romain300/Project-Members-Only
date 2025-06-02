const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

const validateUser = [
    body("password")
        .trim()
        .notEmpty()
        .withMessage("password cannot be empty")
        .custom((value) => {
            if (value !== "TheOne") {
                throw new Error("Password is not correct");
            }
            return true;
        })
];

const updateAdmin = [
    validateUser,

   async (req,res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(401).render("admin", {
                user: req.user,
                errors: errors.array()
            });
        }
        try{
            console.log("Admin rights updapting...");
            await db.updateAdmin(req.user.id);
            console.log("Admin rights updapted");
            return res.status(201).redirect("/");
        }catch(error) {
            return res.status(500).send("something went wrong during admin's update")

        }
    }
];

async function getAdminForm(req,res) {
    return res.render("admin", { user: req.user});
}


module.exports = {
    updateAdmin,
    getAdminForm
};