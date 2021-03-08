import { Sequelize } from "sequelize";
import { VideogameModel, GenreModel } from "./models/videogame";
import { DB } from "../config";
const { DB_NAME, DB_PORT, DB_HOST, DB_PWD, DB_USER } = DB;

// FOR TESTING, JUST ADD MANUALLY THE DB CONFIG LIKE DB_USER, ETC... .ENV DOESN'T WORK WITH THE TESTING.
export var sequelize = new Sequelize(DB_NAME, DB_USER, DB_PWD, {
  dialect: "postgres",
  host: DB_HOST,
  port: DB_PORT,
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  logging: false,
});

// DATABASE CONNECTION
sequelize
  .authenticate()
  .then(() => {
    console.info("POSTGRES CONNECTION DONE");
  })
  .catch((e) => {
    console.info("POSTGRES CONNECTION ERROR!!!");
    console.error(e);
  });

// DATA FOR TESTING
// Delete all the data and tables from the DB at start the program
sequelize.sync({ force: true });
// sequelize.sync({ force: true }).then(() => {
//   const Cod5 = VideogameModel.create({
//     name: "Cod5",
//     description: "Lorem ipsum",
//     platforms: ["Netflix", "Youtube"],
//     rating: 21.2,
//     releaseDate: "25/32/2001",
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
