"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const game_socket_1 = require("./sockets/game.socket");
const http_1 = require("http");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
dotenv_1.default.config();
// Create server
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)({
    origin: [
        "https://tic-tac-toe-chi-pink.vercel.app",
        "https://tic-tac-toe-7u0u.onrender.com",
    ],
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_session_1.default)({
    name: "session",
    keys: [
        process.env.COOKIE_SIGN_KEY || "default_sign_key",
        process.env.COOKIE_ENCRYPT_KEY || "default_encrypt_key",
    ],
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
    sameSite: "none",
}));
// Router
app.use("/api/users", user_routes_1.default);
app.use((req, res) => {
    res.status(404).send("Access denied.");
});
const PORT = process.env.PORT || 3010;
const MONGO_URI = process.env.MONGO_DB;
mongoose_1.default
    .connect(MONGO_URI)
    .then(() => {
    console.log("Connected to MongoDB");
    const server = (0, http_1.createServer)(app);
    (0, game_socket_1.setupGameSocket)(server);
    server.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})
    .catch((err) => console.error("Failed to connect to MongoDB", err));
