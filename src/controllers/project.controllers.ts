import { type Response } from "express";
import { createProject } from "../services/project.services.js";
import { createProjectSchema } from "../validators/project.validators.js";
import type { AuthRequest } from "../middlewares/auth.middlewares.js";
import { createApiKey } from "../services/apiKey.services.js";
import { prisma } from "../db/prisma.js";
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

export const generateProjectApiKey = async (
  req: AuthRequest,
  res: Response,
) => {
  if (!req.userId) {
    return res.status(401).json({
      success: false,
      message: "Authentication Failed",
    });
  }

  const projectIdParam = req.params.projectId;

  const projectId = Array.isArray(projectIdParam)
    ? projectIdParam[0]
    : projectIdParam;

  if (!projectId) {
    return res.status(400).json({
      success: false,
      message: "Project ID is required",
    });
  }

  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      ownerId: req.userId,
    },
  });

  const apiKey = await createApiKey(projectId);

  return res.status(201).json({
    success: true,
    message: "API Key generated successfully",
    data: {
      apiKey,
    },
  });
};
