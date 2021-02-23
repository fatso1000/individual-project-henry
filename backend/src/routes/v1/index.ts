import { Router } from "express";
import uploadGame from "./videogames/uploadVideogame";
import getGenres from "./videogames/getGenres";
import getAllGames from "./videogames/getAllGames";

const router = Router();

router.use("/videogame", uploadGame);
router.use("/genres", getGenres);
router.use("/videogames", getAllGames);


export default router;
