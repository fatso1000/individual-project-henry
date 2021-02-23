"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config_1 = require("./config");
const v1_1 = __importDefault(require("./routes/v1"));
process.on("uncaughtException", (e) => {
    console.error(e);
});
const app = express_1.default();
// EXPRESS CONFIG
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(cors_1.default({ origin: config_1.CORS_URL, optionsSuccessStatus: 200 }));
// ROUTES
app.use("/v1", v1_1.default);
exports.default = app;
