"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const videogame_1 = require("../database/models/videogame");
describe("Videogame Model", () => {
    beforeEach(() => {
        return videogame_1.VideogameModel.sync({ force: true });
    });
    describe("Validations", () => {
        it("error sin required fields", (done) => {
            // @ts-ignore
            videogame_1.VideogameModel.create({
                name: "Hola",
                releaseDate: "25/53/2",
                rating: 24.3,
            })
                .then(() => done("No deberia haberse creado"))
                .catch(() => done());
        });
        it("error con una description invalida", (done) => {
            videogame_1.VideogameModel.create({
                name: "Raul",
                platforms: ["hola", "hola"],
                // @ts-ignore
                description: 243,
            })
                // SEQUELIZE CONVIERTE A STRING EL CAMPO DE DESCRIPTION
                .then((res) => done({ msg: "NO deberia haberse creado", res }))
                .catch(() => done());
        });
    });
});
