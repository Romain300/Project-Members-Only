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
            return res.status(401).render("newMessage", {errors: errors.array()});
        }

        try {
            const date = new Date();
            const author_id = req.user.id;
            const { title, content } = req.body;
            db.newMessage(author_id, title, content, date);
            console.log("Your message has been created")
            return res.status(201).redirect("/");
        } catch (error) {
            return res.status(500).send("something went wrong during the message creation");
        }
        
    }
]

function getFormMessage(req, res) {
    res.render("newMessage");
};

module.exports = {
    getFormMessage,
    postMessage
};