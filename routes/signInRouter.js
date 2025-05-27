const { Router } = require("express");
const { getFormSignIn, createUser } = require("../controllers/signInController");

const signInRouter = Router();
signInRouter.get("/", getFormSignIn);
signInRouter.post("/", createUser);

module.exports = signInRouter;
 