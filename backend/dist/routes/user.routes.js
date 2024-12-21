"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const auth_1 = require("../middleware/auth");
const userRouter = (0, express_1.Router)();
userRouter.get("/play", auth_1.checkAuth, user_controller_1.default.userProfile);
userRouter.post("/login", auth_1.checkAuth, user_controller_1.default.loginUser);
userRouter.get("/", auth_1.checkAuth, user_controller_1.default.getAllUsers);
userRouter.get("/ranking", user_controller_1.default.getTopThreeUsers);
userRouter.get("/logout", auth_1.checkAuth, user_controller_1.default.logoutUser);
userRouter.get("/:id", auth_1.checkAuth, user_controller_1.default.getUserById);
userRouter.post("/register", user_controller_1.default.registerUser);
userRouter.put("/:id", auth_1.checkAuth, user_controller_1.default.updateUser);
userRouter.delete("/:id", auth_1.checkAuth, user_controller_1.default.deleteUserById);
exports.default = userRouter;
