import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET!;

export const generateAccessToken = (userId: string) => {
    return jwt.sign(
        {
            userId,
        },
        jwtSecret,
        {
            expiresIn: "15m"
        }
    )
};