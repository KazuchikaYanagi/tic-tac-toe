"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const checkAuth = (req, res, next) => {
    console.log("Session in checkAuth:", req.session);
    if (req.session && req.session.isAuthenticated && req.session.userId) {
        next();
    }
    else {
        res.status(401).json({ message: "Unauthorized" });
    }
};
exports.checkAuth = checkAuth;
