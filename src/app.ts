import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes";
import { errorMiddleware } from "./middleware/error.middleware";
// env config
dotenv.config();

const app: Application = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/", router);

// test route (optional)
app.get("/", (req, res) => {
  res.send("DevPulse API is running 🚀");
});

export default app;
app.use(errorMiddleware);