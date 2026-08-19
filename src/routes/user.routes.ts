import { Router } from "express";
import { register, login, profile } from "../controllers/user.controllers.js";
import { authenticate } from "../middlewares/auth.middlewares.js";

const router = Router();

router.post("/", register);
router.post("/login", login);
router.get("/me", authenticate, profile);

export default router;