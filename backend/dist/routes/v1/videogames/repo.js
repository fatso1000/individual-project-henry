"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const videogamesRepo_1 = __importDefault(require("../../../database/repo/videogamesRepo"));
const validateRequest_1 = __importDefault(require("../../../middlewares/validateRequest"));
const schema_1 = __importDefault(require("./schema"));
class Repo {
    static uploadVideogameSchema(req, res, next) {
        const schema = schema_1.default.uploadVideogame;
        validateRequest_1.default(req, next, schema);
    }
    static uploadVideogame(req, res, next) {
        videogamesRepo_1.default.addVideoGame(req.body)
            .then((response) => res
            .status(200)
            .json({ msg: "Video Game uploaded succesfully!!", response }))
            .catch(next);
    }
    static getAllGenres(req, res, next) {
        videogamesRepo_1.default.getGenres()
            .then((response) => res.status(200).json({ msg: response.msg, response: response.genres }))
            .catch(next);
    }
    static getAllGames(req, res, next) {
        var name, page;
        if (req.query.hasOwnProperty("name")) {
            name = req.query.name;
        }
        if (req.query.hasOwnProperty("page")) {
            page = req.query.page;
        }
        videogamesRepo_1.default.getAll(name, page)
            .then((response) => {
            // if (response.length === 0) {
            //   return res.status(200).json({ msg: "Videogame could not be found!!", response });
            // }
            res
                .status(200)
                .json({ msg: "List of the first 15 video games!!", response });
        })
            .catch(next);
    }
    static getById(req, res, next) {
        const { id } = req.params;
        const newId = parseInt(id);
        videogamesRepo_1.default.getById(newId)
            .then((response) => {
            res.status(200).json({ msg: "Detail of videogame by ID!!", response });
        })
            .catch(next);
    }
}
exports.default = Repo;
