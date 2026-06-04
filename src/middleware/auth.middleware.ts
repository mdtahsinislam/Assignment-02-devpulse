// import { Request, Response, NextFunction } from "express";
// import { verifyToken } from "../utils/jwt";

// export const authMiddleware = (req: any, res: Response, next: NextFunction) => {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).json({
//       success: false,
//       message: "Unauthorized",
//     });
//   }

//   const decoded = verifyToken(token);
//   req.user = decoded;

//   next();
// };


import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export const authMiddleware = (req: any, res: Response, next: NextFunction) => {
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
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "invalid token",
    });
  }
};