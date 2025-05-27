const { Router } = require("express");
const { getFormMessage, postMessage } = require("../controllers/newMessageControler");

const newMessageRouter = Router();
newMessageRouter.get("/", getFormMessage);
newMessageRouter.post("/", postMessage);

module.exports = newMessageRouter;