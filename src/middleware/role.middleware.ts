import { Request, Response, NextFunction } from "express";

export const roleMiddleware = (requiredRole: string) => {
  return (req: any, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (user.role !== requiredRole) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Access denied",
      });
    }

    next();
  };
};