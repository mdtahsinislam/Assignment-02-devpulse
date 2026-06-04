"use strict";
// // //D:\BisMillaH-Help_me-Allah\Assignment-02-devpulse\src\modules\issue\issue.controller.ts
// // import { Request, Response } from "express";
// // import { pool } from "../../config/db";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteIssue = exports.updateIssue = exports.getSingleIssue = exports.getAllIssues = exports.createIssue = void 0;
const db_1 = require("../../config/db");
// ✅ Create Issue (আগে থেকেই আছে)
const createIssue = async (req, res) => {
    const { title, description, type } = req.body;
    const result = await db_1.pool.query(`INSERT INTO issues(title,description,type,reporter_id)
     VALUES($1,$2,$3,$4)
     RETURNING *`, [title, description, type, req.user.id]);
    res.status(201).json({
        success: true,
        message: "Issue created successfully",
        data: result.rows[0],
    });
};
exports.createIssue = createIssue;
// ✅ Get All (যদি না থাকে add করো)
const getAllIssues = async (req, res) => {
    const result = await db_1.pool.query(`SELECT * FROM issues`);
    res.json({
        success: true,
        data: result.rows,
    });
};
exports.getAllIssues = getAllIssues;
// ✅ Get Single Issue
const getSingleIssue = async (req, res) => {
    const { id } = req.params;
    const result = await db_1.pool.query(`SELECT * FROM issues WHERE id = $1`, [id]);
    if (result.rows.length === 0) {
        return res.status(404).json({
            success: false,
            message: "Issue not found",
        });
    }
    res.json({
        success: true,
        data: result.rows[0],
    });
};
exports.getSingleIssue = getSingleIssue;
// ✅ Update Issue
const updateIssue = async (req, res) => {
    const { id } = req.params;
    const { title, description, type } = req.body;
    const result = await db_1.pool.query(`UPDATE issues
     SET title=$1, description=$2, type=$3
     WHERE id=$4
     RETURNING *`, [title, description, type, id]);
    res.json({
        success: true,
        message: "Issue updated successfully",
        data: result.rows[0],
    });
};
exports.updateIssue = updateIssue;
// ✅ Delete Issue
const deleteIssue = async (req, res) => {
    const { id } = req.params;
    await db_1.pool.query(`DELETE FROM issues WHERE id = $1`, [id]);
    res.json({
        success: true,
        message: "Issue deleted successfully",
    });
};
exports.deleteIssue = deleteIssue;
