const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

const validateUser = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title cannot be empty"),
    body("content")
        .trim()
        .notEmpty()
        .withMessage('Message cannot be empty')
];

const postMessage = [
    validateUser,

    async (req, res) => {
        console.log("creating new message...")
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("Failed to create message")
            return res.status(401).render("newMessage", { errors: errors.array(), user:req.user });
        }

        try {
            const date = new Date();
            const author_id = req.user.id;
            const { title, content } = req.body;
            await db.newMessage(author_id, title, content, date);
            console.log("Your message has been created")
            return res.status(201).redirect("/");
        } catch (error) {
            return res.status(500).send("something went wrong during the message creation");
        }
        
    }
]

function getFormMessage(req, res) {
    console.log(req.session)
    return res.render("newMessage", { user: req.user });
};

module.exports = {
    getFormMessage,
    postMessage
};