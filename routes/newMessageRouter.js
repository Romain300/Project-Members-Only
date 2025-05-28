const { Router } = require("express");
const { getFormMessage, postMessage } = require("../controllers/newMessageControler");
const { isAuth } = require("./authMiddleware");

const newMessageRouter = Router();

newMessageRouter.use(isAuth); //to protect this route
newMessageRouter.get("/", getFormMessage);
newMessageRouter.post("/", postMessage);

module.exports = newMessageRouter;