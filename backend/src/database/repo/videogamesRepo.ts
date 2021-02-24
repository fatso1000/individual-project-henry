import axios from "axios";
import { API_KEY } from "../../config";
import { Op } from "sequelize";
import { VideogameModel, GenreModel } from "../models/videogame";
import { type } from "os";

export interface uploadVideogame extends VideoGameRepo {
  name: string;
  description: string;
  releaseDate: string;
  rating: number;
  platforms: string[];
}

export default class VideoGameRepo {
  public static async getAll(name: any, page?: any, local: boolean = false) {
    if (local === true) {
      if (!name || name === "") {
        const videogamesList = await VideogameModel.findAll({ limit: 15 });
        var tmp: any = [],
          tmp2 = undefined,
          longitud = 15;

        if (videogamesList.length < 15) longitud = videogamesList.length;

        for (let i = 0; i < longitud; i++) {
          tmp2 = {
            tmpid: i,
            id: videogamesList[i].getDataValue("id"),
            name: videogamesList[i].getDataValue("name"),
            // image: videogamesList.results[i].background_image,
            // genres: videogamesList.results[i].genres,
            rating: videogamesList[i].getDataValue("rating"),
          };
          tmp.push(tmp2);
        }
        return {
          results: tmp,
        };
      }
      const include_name = await VideogameModel.findAll({
        attributes: ["id", "name", "rating"],
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
      });
      if (include_name.length <= 0)
        return {
          next: 2,
          previous: null,
          results: tmp,
        };

      var tmp: any = [],
        tmp2 = undefined,
        longitud = 15;
      if (include_name.length < 15) longitud = include_name.length;

      for (let i = 0; i < longitud; i++) {
        tmp2 = {
          tmpid: i,
          id: include_name[i].getDataValue("id"),
          name: include_name[i].getDataValue("name"),
          rating: include_name[i].getDataValue("rating"),
        };
        tmp.push(tmp2);
      }
      return {
        next: 2,
        previous: null,
        results: tmp,
      };
    }
    if (!name || name === "") {
      const videogamesList = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}`
      );
      var tmp: any = [],
        tmp2 = undefined;

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
      const include_name = await axios.get(
        `https://api.rawg.io/api/games?search=${name}&page=${tmppage}&key=${API_KEY}`
      );
      if (include_name.data.count === 0)
        throw "The game with that name doesn't exists!!";

      var tmp: any = [],
        tmp2 = undefined;

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
    const include_name = await axios.get(
      `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`
    );
    if (include_name.data.count === 0)
      throw "The game with that name doesn't exists!!";

    var tmp: any = [],
      tmp2 = undefined;

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
  }

  public static async getById(id: number) {
    // const videogame = await VideogameModel.findOne({
    //   where: {
    //     id,
    //   },
    // });
    try {
      const videogame = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
      );
      return videogame.data;
    } catch (error) {
      throw "VideogameId doesn't exists!!";
    }
  }

  public static async addVideoGame(params: uploadVideogame) {
    const { description, name, platforms, rating, releaseDate } = params;
    const newDate = new Date(releaseDate);

    const videogame = await VideogameModel.create({
      name,
      platforms,
      rating,
      releaseDate: newDate,
      description,
    });
    await videogame.save();
  }

  public static async getGenres() {
    const genresCount = await GenreModel.findAndCountAll();
    if (genresCount.count > 0) {
      const allGenres = await GenreModel.findAll();

      return {
        msg:
          "There's alreay genres in the DB. Exiting of the petition to RAWG!!",
        genres: allGenres,
      };
    }
    const genresList = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );
    genresList.data.results.forEach(async (element: any) => {
      await GenreModel.create({ name: element.name });
    });
    return {
      msg: "Genres saved into the DB succesfully!!",
      genres: genresList.data,
    };
  }
}
