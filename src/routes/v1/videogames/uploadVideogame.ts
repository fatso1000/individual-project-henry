import { Router } from "express";
import Repo from "./repo";

const router = Router();

router.post("/basic", Repo.uploadVideogameSchema, Repo.uploadVideogame);

export default router;
