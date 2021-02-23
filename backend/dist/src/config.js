"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_KEY = exports.DB = exports.PORT = exports.CORS_URL = void 0;
exports.CORS_URL = process.env.CORS_URL || "*";
exports.PORT = process.env.PORT || 8080;
exports.DB = {
    DB_USER: process.env.DB_USER,
    DB_PWD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
};
exports.API_KEY = process.env.API_KEY;
