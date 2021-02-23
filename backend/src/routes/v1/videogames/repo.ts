import { Request, Response, NextFunction } from "express";
import VideogamesRepo from "../../../database/repo/videogamesRepo";
import validateRequest from "../../../middlewares/validateRequest";
import schemas from "./schema";

export default class Repo {
  public static uploadVideogameSchema(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const schema = schemas.uploadVideogame;
    validateRequest(req, next, schema);
  }

  public static uploadVideogame(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    VideogamesRepo.addVideoGame(req.body)
      .then((response) =>
        res
          .status(200)
          .json({ msg: "Video Game uploaded succesfully!!", response })
      )
      .catch(next);
  }

  public static getAllGenres(req: Request, res: Response, next: NextFunction) {
    VideogamesRepo.getGenres()
      .then((response) =>
        res.status(200).json({ msg: response.msg, response: response.genres })
      )
      .catch(next);
  }

  public static getAllGames(req: Request, res: Response, next: NextFunction) {
    var name, page;
    if (req.query.hasOwnProperty("name")) {
      name = req.query.name;
    }
    if (req.query.hasOwnProperty("page")) {
      page = req.query.page;
    }
    VideogamesRepo.getAll(name, page)
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

  public static getById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const newId = parseInt(id);
    VideogamesRepo.getById(newId)
      .then((response) => {
        res.status(200).json({ msg: "Detail of videogame by ID!!", response });
      })
      .catch(next);
  }
}
