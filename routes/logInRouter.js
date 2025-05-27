const { Router } = require("express");
const { getFormLogIn, logUser } = require("../controllers/logInController");

const logInRouter = Router();
logInRouter.get("/", getFormLogIn);
logInRouter.post("/", logUser);

module.exports = logInRouter;