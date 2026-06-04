
// // //D:\BisMillaH-Help_me-Allah\Assignment-02-devpulse\src\modules\issue\issue.controller.ts
// // import { Request, Response } from "express";
// // import { pool } from "../../config/db";

// // export const createIssue = async (req: any, res: Response) => {
// //   const { title, description, type } = req.body;

// //   const result = await pool.query(
// //     `INSERT INTO issues(title,description,type,reporter_id)
// //      VALUES($1,$2,$3,$4)
// //      RETURNING *`,
// //     [title, description, type, req.user.id]
// //   );

// //   res.status(201).json({
// //     success: true,
// //     message: "Issue created successfully",
// //     data: result.rows[0],
// //   });
// // };


// import { Request, Response } from "express";
// import { pool } from "../../config/db";

// // CREATE
// export const createIssue = async (req: any, res: Response) => {
//   const { title, description, type } = req.body;

//   const result = await pool.query(
//     `INSERT INTO issues(title,description,type,reporter_id)
//      VALUES($1,$2,$3,$4)
//      RETURNING *`,
//     [title, description, type, req.user.id]
//   );

//   res.status(201).json({
//     success: true,
//     message: "Issue created successfully",
//     data: result.rows[0],
//   });
// };

// // ✅ ADD THIS (🔥 missing ছিল)
// export const getAllIssues = async (req: Request, res: Response) => {
//   const result = await pool.query("SELECT * FROM issues");

//   res.status(200).json({
//     success: true,
//     message: "Issues retrieved successfully",
//     data: result.rows,
//   });
// };



import { Request, Response } from "express";
import { pool } from "../../config/db";

// ✅ Create Issue (আগে থেকেই আছে)
export const createIssue = async (req: any, res: Response) => {
  const { title, description, type } = req.body;

  const result = await pool.query(
    `INSERT INTO issues(title,description,type,reporter_id)
     VALUES($1,$2,$3,$4)
     RETURNING *`,
    [title, description, type, req.user.id]
  );

  res.status(201).json({
    success: true,
    message: "Issue created successfully",
    data: result.rows[0],
  });
};

// ✅ Get All (যদি না থাকে add করো)
export const getAllIssues = async (req: Request, res: Response) => {
  const result = await pool.query(`SELECT * FROM issues`);

  res.json({
    success: true,
    data: result.rows,
  });
};

// ✅ Get Single Issue
export const getSingleIssue = async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await pool.query(
    `SELECT * FROM issues WHERE id = $1`,
    [id]
  );

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

// ✅ Update Issue
export const updateIssue = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, type } = req.body;

  const result = await pool.query(
    `UPDATE issues
     SET title=$1, description=$2, type=$3
     WHERE id=$4
     RETURNING *`,
    [title, description, type, id]
  );

  res.json({
    success: true,
    message: "Issue updated successfully",
    data: result.rows[0],
  });
};

// ✅ Delete Issue
export const deleteIssue = async (req: Request, res: Response) => {
  const { id } = req.params;

  await pool.query(
    `DELETE FROM issues WHERE id = $1`,
    [id]
  );

  res.json({
    success: true,
    message: "Issue deleted successfully",
  });
};