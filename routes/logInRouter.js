const { Router } = require("express");
const { getFormLogIn } = require("../controllers/logInController");

const logInRouter = Router();
logInRouter.get("/", getFormLogIn);

module.exports = logInRouter;