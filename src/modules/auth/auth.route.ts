
//D:\BisMillaH-Help_me-Allah\Assignment-02-devpulse\src\modules\auth\auth.route.ts

import express from "express";
import { signup, login } from "./auth.controller";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

export default router;