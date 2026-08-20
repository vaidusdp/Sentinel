import type { Response, NextFunction } from "express";
import type { AuthRequest } from "./auth.middlewares.js";
import { UserRole } from "../../generated/prisma/enums.js";
import { prisma } from "../db/prisma.js";
import { success } from "zod";

export const requireRole = (...allowedRoles: UserRole[]) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication Require",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: req.userId,
      },
      select: {
        role: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User Not Found",
      });
    }

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to perform this action",
      });
    }

    next();
  };
};
