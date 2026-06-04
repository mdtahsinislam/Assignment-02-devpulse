"use strict";
// //D:\BisMillaH-Help_me-Allah\Assignment-02-devpulse\src\modules\auth\auth.controller.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const db_1 = require("../../config/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../../utils/jwt");
// ✅ SIGNUP
const signup = async (req, res) => {
    const { name, email, password, role } = req.body;
    const hashed = await bcrypt_1.default.hash(password, 10);
    const result = await db_1.pool.query(`INSERT INTO users(name,email,password,role)
     VALUES($1,$2,$3,$4)
     RETURNING id,name,email,role,created_at,updated_at`, [name, email, hashed, role]);
    res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: result.rows[0],
    });
};
exports.signup = signup;
// ✅ LOGIN (🔥 MISSING ছিল — এখন add করো)
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await db_1.pool.query("SELECT * FROM users WHERE email=$1", [email]);
    if (user.rows.length === 0) {
        return res.status(400).json({
            success: false,
            message: "Invalid credentials",
        });
    }
    const valid = await bcrypt_1.default.compare(password, user.rows[0].password);
    if (!valid) {
        return res.status(400).json({
            success: false,
            message: "Invalid credentials",
        });
    }
    const token = (0, jwt_1.generateToken)({
        id: user.rows[0].id,
        name: user.rows[0].name,
        role: user.rows[0].role,
    });
    res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
            token,
            user: user.rows[0],
        },
    });
};
exports.login = login;
