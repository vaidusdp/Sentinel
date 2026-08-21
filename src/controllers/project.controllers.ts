import { type Response } from "express";
import { createProject } from "../services/project.services.js";
import { createProjectSchema } from "../validators/project.validators.js";
import type { AuthRequest } from "../middlewares/auth.middlewares.js";
import { success } from "zod";

export const projectCreate = async (req: AuthRequest, res: Response) => {
  if (!req.userId) {
    return res.status(401).json({
      success: false,
      message: "Authentication Required",
    });
  }

  const result = createProjectSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid Request Data",
    });
  }

  const project = await createProject(result.data, req.userId);

  return res.status(201).json({
    success: true,
    message: "Project Created Successfully",
    data: project,
  });
};
