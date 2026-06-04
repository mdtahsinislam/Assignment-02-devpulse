


// //D:\BisMillaH-Help_me-Allah\Assignment-02-devpulse\src\modules\auth\auth.service.ts
// import { pool } from "../../config/db";
// import bcrypt from "bcrypt";
// import { generateToken } from "../../utils/jwt";

// import { hashPassword, comparePassword } from "../../utils/hash";

// // signup
// const hashed = await hashPassword(password);

// // login
// const isValid = await comparePassword(password, user.rows[0].password);

// export const createUserService = async (payload: any) => {
//   const { name, email, password, role } = payload;

//   const hashed = await bcrypt.hash(password, 10);

//   const result = await pool.query(
//     `INSERT INTO users(name,email,password,role)
//      VALUES($1,$2,$3,$4)
//      RETURNING id,name,email,role,created_at,updated_at`,
//     [name, email, hashed, role]
//   );

//   return result.rows[0];
// };

// export const loginUserService = async (payload: any) => {
//   const { email, password } = payload;

//   const user = await pool.query(
//     "SELECT * FROM users WHERE email=$1",
//     [email]
//   );

//   if (user.rows.length === 0) {
//     throw new Error("Invalid credentials");
//   }

//   const isValid = await bcrypt.compare(
//     password,
//     user.rows[0].password
//   );

//   if (!isValid) {
//     throw new Error("Invalid credentials");
//   }

//   const token = generateToken({
//     id: user.rows[0].id,
//     name: user.rows[0].name,
//     role: user.rows[0].role,
//   });

//   return {
//     token,
//     user: {
//       id: user.rows[0].id,
//       name: user.rows[0].name,
//       email: user.rows[0].email,
//       role: user.rows[0].role,
//       created_at: user.rows[0].created_at,
//       updated_at: user.rows[0].updated_at,
//     },
//   };
// };




import { pool } from "../../config/db";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/jwt";

// signup
export const createUserService = async (payload: any) => {
  const { name, email, password, role } = payload;

  const hashed = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `INSERT INTO users(name,email,password,role)
     VALUES($1,$2,$3,$4)
     RETURNING id,name,email,role,created_at,updated_at`,
    [name, email, hashed, role]
  );

  return result.rows[0];
};

// login
export const loginUserService = async (payload: any) => {
  const { email, password } = payload;

  const user = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );

  if (user.rows.length === 0) {
    throw new Error("Invalid credentials");
  }

  const isValid = await bcrypt.compare(
    password,
    user.rows[0].password
  );

  if (!isValid) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken({
    id: user.rows[0].id,
    name: user.rows[0].name,
    role: user.rows[0].role,
  });

  return {
    token,
    user: {
      id: user.rows[0].id,
      name: user.rows[0].name,
      email: user.rows[0].email,
      role: user.rows[0].role,
      created_at: user.rows[0].created_at,
      updated_at: user.rows[0].updated_at,
    },
  };
};