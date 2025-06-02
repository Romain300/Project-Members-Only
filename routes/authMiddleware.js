const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.status(403).send("You are not authorized to view this resource")
    }
};

const isMember = (req, res, next) => {
    if (req.isAuthenticated() && req.user.member) {
        return next();
    } else {
        return res.status(403).send("You must be a member to view this ressource");
    }
}

const isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.admin) {
        return next();
    } else {
        return res.status(403).send("You must be an admin to view this ressource");
    }
};

module.exports = {
    isAuth,
    isAdmin,
    isMember
};