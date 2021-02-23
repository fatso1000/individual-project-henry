"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.default = {
    uploadVideogame: joi_1.default.object().keys({
        name: joi_1.default.string().min(3).max(100).required(),
        description: joi_1.default.string().max(1000).required(),
        releaseDate: joi_1.default.string().optional(),
        rating: joi_1.default.number().optional(),
        platforms: joi_1.default.array()
            .min(0)
            .items(joi_1.default.string().uppercase().trim())
            .required(),
    }),
};
