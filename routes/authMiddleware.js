const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.status(403).render("notAuthorised", { user: req.user });
    }
};

const isMember = (req, res, next) => {
    if (req.isAuthenticated() && req.user.member) {
        return next();
    } else {
        return res.status(403).render("notAuthorised", { user: req.user });
    }
}

const isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.admin) {
        return next();
    } else {
        return res.status(403).render("notAuthorised", { user: req.user });
    }
};

module.exports = {
    isAuth,
    isAdmin,
    isMember
};