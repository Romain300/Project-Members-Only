const db = require("../db/queries");

async function deleteMessage(req,res) {
    try {
        console.log("deleting message...")
        const { messageId}  = req.body;
        await db.deleteMessage(messageId);
        console.log("message deleted");
        res.status(201).redirect("/");
    }catch(error) {
        res.status(500).send("something went wrong during deletion")
    }
};

module.exports = {
    deleteMessage,
};