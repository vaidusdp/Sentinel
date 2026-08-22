import { Router } from "express";
import {
  projectCreate,
  generateProjectApiKey,
} from "../controllers/project.controllers.js";
import { authenticate } from "../middlewares/auth.middlewares.js";

const router = Router();

router.post("/", authenticate, projectCreate);
router.post("/:projectId/api-key", authenticate, generateProjectApiKey);

export default router;
