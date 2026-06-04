

// //D:\BisMillaH-Help_me-Allah\Assignment-02-devpulse\src\routes\index.ts

// import express from "express";
// import { signup, login } from "../modules/auth/auth.controller";
// import { createIssue } from "../modules/issue/issue.controller";
// import { authMiddleware } from "../middleware/auth.middleware";

// const router = express.Router();

// router.post("/api/auth/signup", signup);
// router.post("/api/auth/login", login);

// router.post("/api/issues", authMiddleware, createIssue);

// export default router;


import express from "express";
import authRoutes from "../modules/auth/auth.route";
import issueRoutes from "../modules/issue/issue.route";

const router = express.Router();

router.use("/api/auth", authRoutes);
router.use("/api/issues", issueRoutes);

export default router;