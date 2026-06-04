
// //D:\BisMillaH-Help_me-Allah\Assignment-02-devpulse\src\modules\auth\auth.controller.ts

// import { Request, Response } from "express";
// import { pool } from "../../config/db";
// import bcrypt from "bcrypt";

// export const signup = async (req: Request, res: Response) => {
//   const { name, email, password, role } = req.body;

//   const hashed = await bcrypt.hash(password, 10);

//   const result = await pool.query(
//     `INSERT INTO users(name,email,password,role)
//      VALUES($1,$2,$3,$4) RETURNING id,name,email,role,created_at,updated_at`,
//     [name, email, hashed, role]
//   );

//   res.status(201).json({
//     success: true,
//     message: "User registered successfully",
//     data: result.rows[0],
//   });
// };




import { Request, Response } from "express";
import { pool } from "../../config/db";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/jwt";

// ✅ SIGNUP
export const signup = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `INSERT INTO users(name,email,password,role)
     VALUES($1,$2,$3,$4)
     RETURNING id,name,email,role,created_at,updated_at`,
    [name, email, hashed, role]
  );

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: result.rows[0],
  });
};

// ✅ LOGIN (🔥 MISSING ছিল — এখন add করো)
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );

  if (user.rows.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  const valid = await bcrypt.compare(
    password,
    user.rows[0].password
  );

  if (!valid) {
    return res.status(400).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  const token = generateToken({
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