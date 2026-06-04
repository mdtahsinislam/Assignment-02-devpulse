"use strict";
// //D:\BisMillaH-Help_me-Allah\Assignment-02-devpulse\src\routes\index.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import express from "express";
// import { signup, login } from "../modules/auth/auth.controller";
// import { createIssue } from "../modules/issue/issue.controller";
// import { authMiddleware } from "../middleware/auth.middleware";
// const router = express.Router();
// router.post("/api/auth/signup", signup);
// router.post("/api/auth/login", login);
// router.post("/api/issues", authMiddleware, createIssue);
// export default router;
const express_1 = __importDefault(require("express"));
const auth_route_1 = __importDefault(require("../modules/auth/auth.route"));
const issue_route_1 = __importDefault(require("../modules/issue/issue.route"));
const router = express_1.default.Router();
router.use("/api/auth", auth_route_1.default);
router.use("/api/issues", issue_route_1.default);
exports.default = router;
