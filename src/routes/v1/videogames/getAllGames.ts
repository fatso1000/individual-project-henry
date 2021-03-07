import { Router } from "express";
import Repo from "./repo";

const router = Router();

router.get("/basic", Repo.getAllGames);
router.get("/basic/:id", Repo.getById);

export default router;
