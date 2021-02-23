import { Router } from "express";
import Repo from "./repo";

const router = Router();

router.get("/basic", Repo.getAllGenres);

export default router;
