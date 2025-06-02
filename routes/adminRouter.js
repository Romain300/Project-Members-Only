const { Router } = require("express");
const { updateAdmin, getAdminForm } = require("../controllers/updateAdminController");
const { isAuth, isMember } = require("./authMiddleware");

const adminRouter = Router();
adminRouter.use(isAuth, isMember);
adminRouter.get("/", getAdminForm);
adminRouter.post("/", updateAdmin);

module.exports = adminRouter;