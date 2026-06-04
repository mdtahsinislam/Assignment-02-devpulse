"use strict";
// //D:\BisMillaH-Help_me-Allah\Assignment-02-devpulse\src\modules\issue\issue.route.ts
// import express from "express";
// import {
//   createIssue,
//   getAllIssues,
// } from "./issue.controller";
// import { authMiddleware } from "../../middleware/auth.middleware";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const router = express.Router();
// router.post("/", authMiddleware, createIssue);
// router.get("/", getAllIssues);
// export default router;
const express_1 = __importDefault(require("express"));
const issue_controller_1 = require("./issue.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = express_1.default.Router();
router.post("/", auth_middleware_1.authMiddleware, issue_controller_1.createIssue);
router.get("/", issue_controller_1.getAllIssues);
router.get("/:id", issue_controller_1.getSingleIssue);
router.put("/:id", auth_middleware_1.authMiddleware, issue_controller_1.updateIssue);
router.delete("/:id", auth_middleware_1.authMiddleware, issue_controller_1.deleteIssue);
exports.default = router;
