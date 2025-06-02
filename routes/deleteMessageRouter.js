const { Router } = require("express");
const { deleteMessage } = require("../controllers/deleteMessageController");
const { isAuth, isMember, isAdmin } = require("./authMiddleware");

const deleteRouter = Router();
deleteRouter.use(isAuth, isMember,isAdmin,);
deleteRouter.post("/", deleteMessage);

module.exports = deleteRouter;