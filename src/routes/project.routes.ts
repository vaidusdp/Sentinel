import { Router } from "express";
import { projectCreate } from "../controllers/project.controllers.js";
import { authenticate } from "../middlewares/auth.middlewares.js";

const router = Router();

router.post("/", authenticate, projectCreate);

export default router;
