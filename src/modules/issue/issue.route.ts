

// //D:\BisMillaH-Help_me-Allah\Assignment-02-devpulse\src\modules\issue\issue.route.ts
// import express from "express";
// import {
//   createIssue,
//   getAllIssues,
// } from "./issue.controller";
// import { authMiddleware } from "../../middleware/auth.middleware";

// const router = express.Router();

// router.post("/", authMiddleware, createIssue);
// router.get("/", getAllIssues);

// export default router;

import express from "express";
import {
  createIssue,
  getAllIssues,
  getSingleIssue,
  updateIssue,
  deleteIssue,
} from "./issue.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = express.Router();

router.post("/", authMiddleware, createIssue);
router.get("/", getAllIssues);
router.get("/:id", getSingleIssue);
router.put("/:id", authMiddleware, updateIssue);
router.delete("/:id", authMiddleware, deleteIssue);

export default router;