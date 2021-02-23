"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../../config");
const videogame_1 = require("../models/videogame");
class VideoGameRepo {
    static getAll(name, page) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!name || name === "") {
                // const videogamesList = await VideogameModel.findAll({ limit: 15 });
                const videogamesList = yield axios_1.default.get(`https://api.rawg.io/api/games?key=${config_1.API_KEY}`);
                var tmp = [], tmp2 = undefined;
                for (let i = 0; i < 15; i++) {
                    tmp2 = {
                        tmpid: i,
                        id: videogamesList.data.results[i].id,
                        name: videogamesList.data.results[i].name,
                        image: videogamesList.data.results[i].background_image,
                        genres: videogamesList.data.results[i].genres,
                        rating: videogamesList.data.results[i].rating,
                    };
                    tmp.push(tmp2);
                }
                return {
                    next: videogamesList.data.next,
                    previous: videogamesList.data.previous,
                    results: tmp,
                };
            }
            // NEXT OR PREVIOUS PAGE SEARCH
            var tmppage = parseInt(page);
            if (tmppage && tmppage !== NaN) {
                var tmppage = parseInt(page);
                const include_name = yield axios_1.default.get(`https://api.rawg.io/api/games?search=${name}&page=${tmppage}&key=${config_1.API_KEY}`);
                if (include_name.data.count === 0)
                    throw "The game with that name doesn't exists!!";
                var tmp = [], tmp2 = undefined;
                for (let i = 0; i < 15; i++) {
                    tmp2 = {
                        tmpid: i,
                        id: include_name.data.results[i].id,
                        name: include_name.data.results[i].name,
                        image: include_name.data.results[i].background_image,
                        genres: include_name.data.results[i].genres,
                        rating: include_name.data.results[i].rating,
                    };
                    tmp.push(tmp2);
                }
                return {
                    next: tmppage + 1,
                    previous: tmppage - 1 === 0 ? null : 1,
                    results: tmp,
                };
            }
            // REEMPLAZE ILIKE FOR LIKE, IT'S NEEDED BECAUSE OF THE CASE SENSITIVE
            // const include_name = await VideogameModel.findAll({
            //   where: {
            //     name: {
            //       [Op.iLike]: `%${name}%`,
            //     },
            //   },
            // });
            const include_name = yield axios_1.default.get(`https://api.rawg.io/api/games?search=${name}&key=${config_1.API_KEY}`);
            if (include_name.data.count === 0)
                throw "The game with that name doesn't exists!!";
            var tmp = [], tmp2 = undefined;
            for (let i = 0; i < 15; i++) {
                tmp2 = {
                    tmpid: i,
                    id: include_name.data.results[i].id,
                    name: include_name.data.results[i].name,
                    image: include_name.data.results[i].background_image,
                    genres: include_name.data.results[i].genres,
                    rating: include_name.data.results[i].rating,
                };
                tmp.push(tmp2);
            }
            return {
                next: 2,
                previous: null,
                results: tmp,
            };
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // const videogame = await VideogameModel.findOne({
            //   where: {
            //     id,
            //   },
            // });
            try {
                const videogame = yield axios_1.default.get(`https://api.rawg.io/api/games/${id}?key=${config_1.API_KEY}`);
                return videogame.data;
            }
            catch (error) {
                throw "VideogameId doesn't exists!!";
            }
        });
    }
    static addVideoGame(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { description, name, platforms, rating, releaseDate } = params;
            const videogame = yield videogame_1.VideogameModel.create({
                name,
                platforms,
                rating,
                releaseDate,
                description,
            });
            yield videogame.save();
            console.log("VideoGame to submit: ", videogame.toJSON());
        });
    }
    static getGenres() {
        return __awaiter(this, void 0, void 0, function* () {
            const genresCount = yield videogame_1.GenreModel.findAndCountAll();
            if (genresCount.count > 0) {
                const allGenres = yield videogame_1.GenreModel.findAll();
                return {
                    msg: "There's alreay genres in the DB. Exiting of the petition to RAWG!!",
                    genres: allGenres,
                };
            }
            const genresList = yield axios_1.default.get(`https://api.rawg.io/api/genres?key=${config_1.API_KEY}`);
            genresList.data.results.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                yield videogame_1.GenreModel.create({ name: element.name });
            }));
            return {
                msg: "Genres saved into the DB succesfully!!",
                genres: genresList.data,
            };
        });
    }
}
exports.default = VideoGameRepo;
