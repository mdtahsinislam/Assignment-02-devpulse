"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleMiddleware = void 0;
const roleMiddleware = (requiredRole) => {
    return (req, res, next) => {
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
exports.roleMiddleware = roleMiddleware;
