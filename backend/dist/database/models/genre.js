"use strict";
// import { DataTypes, Model, Optional, Sequelize } from "sequelize";
// import { sequelize } from "../index";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenreModel = void 0;
// export interface GenreAttributes {
//   id?: number;
//   name: string;
// }
// export interface GenreCreationAttributes
//   extends Optional<GenreAttributes, "id"> {}
// export interface GenreInterface
//   extends Model<GenreAttributes, GenreCreationAttributes>,
//     GenreAttributes {}
// export const GenreModel = sequelize.define<GenreInterface>("genre", {
//   id: {
//     primaryKey: true,
//     autoIncrement: true,
//     type: DataTypes.INTEGER,
//   },
//   name: {
//     type: DataTypes.STRING,
//   },
// });
const sequelize_1 = require("sequelize");
const index_1 = require("../index");
exports.GenreModel = index_1.sequelize.define("videogame", {
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
});
