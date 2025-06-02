const { Router } = require("express");
const { getFormMember, updateMembership } = require("../controllers/joinController");
const { isAuth } = require("./authMiddleware");

const joinRouter = Router();
joinRouter.use(isAuth);
joinRouter.get("/", getFormMember);
joinRouter.post("/", updateMembership);

module.exports = joinRouter;