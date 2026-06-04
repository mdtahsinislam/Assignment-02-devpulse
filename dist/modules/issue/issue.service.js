"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllIssuesService = exports.createIssueService = void 0;
const db_1 = require("../../config/db");
// CREATE ISSUE
const createIssueService = async (payload, userId) => {
    const { title, description, type } = payload;
    const result = await db_1.pool.query(`INSERT INTO issues(title,description,type,reporter_id)
     VALUES($1,$2,$3,$4)
     RETURNING *`, [title, description, type, userId]);
    return result.rows[0];
};
exports.createIssueService = createIssueService;
// GET ALL ISSUES (Challenge 🔥 no JOIN)
const getAllIssuesService = async (query) => {
    let sql = `SELECT * FROM issues WHERE 1=1`;
    const values = [];
    if (query.type) {
        values.push(query.type);
        sql += ` AND type=$${values.length}`;
    }
    if (query.status) {
        values.push(query.status);
        sql += ` AND status=$${values.length}`;
    }
    if (query.sort === "oldest") {
        sql += ` ORDER BY created_at ASC`;
    }
    else {
        sql += ` ORDER BY created_at DESC`;
    }
    const issues = await db_1.pool.query(sql, values);
    // NO JOIN → separate query
    const reporterIds = issues.rows.map((i) => i.reporter_id);
    const users = await db_1.pool.query(`SELECT id,name,role FROM users WHERE id = ANY($1)`, [reporterIds]);
    const userMap = {};
    users.rows.forEach((u) => {
        userMap[u.id] = u;
    });
    const finalData = issues.rows.map((issue) => ({
        ...issue,
        reporter: userMap[issue.reporter_id],
    }));
    return finalData;
};
exports.getAllIssuesService = getAllIssuesService;
