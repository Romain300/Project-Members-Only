const db = require("../db/queries");

function formatDate(date) {
    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    }) + ", " + date.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    });
};

async function getIndex(req, res) {
    const messages = await db.getAllMessages();
    messages.forEach((msg) => {
        msg.formattedDate = formatDate(new Date(msg.date))
    })
    return res.render("index", { user: req.user, messages: messages});
};

module.exports = {
    getIndex,
};