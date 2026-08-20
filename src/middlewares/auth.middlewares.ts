import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { success } from "zod";

const jwtSecret = process.env.JWT_SECRET!;

export interface AuthRequest extends Request {
  userId?: string;
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Invalid Authorization Request",
    });
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({
      success: false,
      message: "Invalid Authorization Format",
    });
  }

  try {
    const decodedToken = jwt.verify(token, jwtSecret);

    if (typeof decodedToken !== "object" || !decodedToken.userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid Token",
      });
    }

    req.userId = decodedToken.userId;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
