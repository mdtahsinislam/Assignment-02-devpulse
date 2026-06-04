"use strict";
// import { Request, Response, NextFunction } from "express";
// import { verifyToken } from "../utils/jwt";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jwt_1 = require("../utils/jwt");
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
    }
    // 🔥 FIX HERE
    const token = authHeader.split(" ")[1]; // remove "Bearer"
    try {
        const decoded = (0, jwt_1.verifyToken)(token);
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: "invalid token",
        });
    }
};
exports.authMiddleware = authMiddleware;
