const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    } else {
        return res.status(401).send("You are not authorized to view this resource")
    }
};

isAdmin = (req, res, next) => {

};

module.exports = {
    isAuth,
    isAdmin,
}