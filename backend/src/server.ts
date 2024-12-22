import express, { Response, Request } from "express";
import cors from "cors";
import cookieSession from "cookie-session";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { setupGameSocket } from "./sockets/game.socket";
import { createServer } from "http";

import userRouter from "./routes/user.routes";

dotenv.config();

// Create server
const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "https://tic-tac-toe-chi-pink.vercel.app",
      "https://tic-tac-toe-7u0u.onrender.com",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "session",
    keys: [
      process.env.COOKIE_SIGN_KEY || "default_sign_key",
      process.env.COOKIE_ENCRYPT_KEY || "default_encrypt_key",
    ],
    maxAge: 24 * 60 * 60 * 1000,
    domain: "https://tic-tac-toe-7u0u.onrender.com",
    // httpOnly: true,
    secure: true,
    // sameSite: "none",
  })
);

// Router
app.use("/api/users", userRouter);

app.use((req: Request, res: Response) => {
  res.status(404).send("Access denied.");
});

const PORT = process.env.PORT || 3010;
const MONGO_URI = process.env.MONGO_DB!;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");

    const server = createServer(app);
    setupGameSocket(server);

    server.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("Failed to connect to MongoDB", err));
