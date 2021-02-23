"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenreModel = exports.VideogameModel = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("../index");
// -------------------------------------------------------------------------------- //
exports.VideogameModel = index_1.sequelize.define("videogame", {
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    releaseDate: {
        type: sequelize_1.DataTypes.STRING,
    },
    rating: {
        type: sequelize_1.DataTypes.DECIMAL,
    },
    platforms: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
        allowNull: false,
    },
});
exports.GenreModel = index_1.sequelize.define("genre", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
    },
});
// RELATIONSHIPS
exports.VideogameModel.belongsToMany(exports.GenreModel, { through: "genre" });
exports.GenreModel.belongsToMany(exports.VideogameModel, { through: "genre" });
// HOOKS
// VideogameModel.addHook("beforeValidate", (videogame) => {
//   var tmp = videogame._attributes.name.replace(/\s+/g, "_").replace(/\W/g, "");
//   videogame._attributes.name = tmp;
// });
