import { pool } from "../../config/db";

// CREATE ISSUE
export const createIssueService = async (payload: any, userId: number) => {
  const { title, description, type } = payload;

  const result = await pool.query(
    `INSERT INTO issues(title,description,type,reporter_id)
     VALUES($1,$2,$3,$4)
     RETURNING *`,
    [title, description, type, userId]
  );

  return result.rows[0];
};

// GET ALL ISSUES (Challenge 🔥 no JOIN)
export const getAllIssuesService = async (query: any) => {
  let sql = `SELECT * FROM issues WHERE 1=1`;
  const values: any[] = [];

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
  } else {
    sql += ` ORDER BY created_at DESC`;
  }

  const issues = await pool.query(sql, values);

  // NO JOIN → separate query
  const reporterIds = issues.rows.map((i: any) => i.reporter_id);

  const users = await pool.query(
    `SELECT id,name,role FROM users WHERE id = ANY($1)`,
    [reporterIds]
  );

  const userMap: any = {};
  users.rows.forEach((u: any) => {
    userMap[u.id] = u;
  });

  const finalData = issues.rows.map((issue: any) => ({
    ...issue,
    reporter: userMap[issue.reporter_id],
  }));

  return finalData;
};