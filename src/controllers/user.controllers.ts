import { type Request, type Response } from "express";
import { createUserSchema, loginSchema } from "../validators/user.validators.js";
import { createUser, loginUser } from "../services/user.services.js";
import type { AuthRequest } from "../middlewares/auth.middlewares.js";
import { prisma } from "../db/prisma.js";

const register = async (
    req: Request,
    res: Response
) => {
    const result = createUserSchema.safeParse(req.body);
    
    if(!result.success){
        return res.status(400).json({
            success: false,
            message: "User created successfully",
            errors: result.error.flatten()
        });
    }

    const user = await createUser(result.data);

    return res.status(201).json({
        success: true,
        message: "User Created Successfully",
        data: user
    });
}

const login = async (
    req: Request,
    res: Response
) => {
    const result = loginSchema.safeParse(req.body);

    if(!result.success){
        return res.status(400).json({
            success: false,
            message: "Invalid Credentials",
            errors: result.error.flatten()
        });
    };

    const user = await loginUser(result.data);

    return res.status(201).json({
        success: true,
        message: "Login Successful",
        data: user
    });
}

const profile = async (
    req: AuthRequest,
    res: Response
) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.userId,
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
        },
    });

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    return res.json({
        success: true,
        data: user,
    });
}

export {
    register,
    login,
    profile
}