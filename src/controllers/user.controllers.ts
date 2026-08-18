import { type Request, type Response } from "express";
import { createUserSchema } from "../validators/user.validators.js";
import { createUser } from "../services/user.services.js";
import { success } from "zod";
import { error } from "console";

const registerUser = async (
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

export {
    registerUser
}