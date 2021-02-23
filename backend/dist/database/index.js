"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../config");
const { DB_HOST, DB_PWD, DB_USER } = config_1.DB;
exports.sequelize = new sequelize_1.Sequelize("videogames", DB_USER || "postgres", DB_PWD || "poderOS123", {
    host: DB_HOST || "localhost",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        idle: 10000,
    },
    logging: false,
});
// DATABASE CONNECTION
exports.sequelize
    .authenticate()
    .then(() => {
    console.info("POSTGRES CONNECTION DONE");
})
    .catch((e) => {
    console.info("POSTGRES CONNECTION ERROR!!!");
    console.error(e);
});
// DATA FOR TESTING
// sequelize.sync({ force: true }).then(() => {
//   const Cod5 = VideogameModel.create({
//     name: "Cod5",
//     description: "Lorem ipsum",
//     platforms: ["Netflix", "Youtube"],
//     rating: 21.2,
//     releaseDate: "25/32/1222",
//   });
//   const Gow2 = VideogameModel.create({
//     name: "GoW2",
//     description: "Lorem ipsum",
//     platforms: ["Netflix", "Youtube"],
//     releaseDate: "25/32/1222",
//   });
//   const aoe2 = VideogameModel.create({
//     name: "AOE2",
//     description: "Lorem ipsum",
//     platforms: ["Steam", "Youtube"],
//     rating: 2.2,
//   });
//   Promise.all([Cod5, Gow2, aoe2]).then((res) => console.log("DATA LOADED"));
// });
