"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const error_middleware_1 = require("./middleware/error.middleware");
// env config
dotenv_1.default.config();
const app = (0, express_1.default)();
// middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// routes
app.use("/", routes_1.default);
// test route (optional)
app.get("/", (req, res) => {
    res.send("DevPulse API is running 🚀");
});
exports.default = app;
app.use(error_middleware_1.errorMiddleware);
