"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uploadVideogame_1 = __importDefault(require("./videogames/uploadVideogame"));
const getGenres_1 = __importDefault(require("./videogames/getGenres"));
const getAllGames_1 = __importDefault(require("./videogames/getAllGames"));
const router = express_1.Router();
router.use("/videogame", uploadVideogame_1.default);
router.use("/genres", getGenres_1.default);
router.use("/videogames", getAllGames_1.default);
exports.default = router;
