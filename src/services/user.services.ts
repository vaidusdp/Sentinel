import { prisma } from "../db/prisma.js"
import { hashPassword } from "../utils/password.js"

interface CreateUserInput {
    name: string,
    email: string,
    password: string,
}

export const createUser = async ({
    name,
    email, 
    password
} : CreateUserInput) => {
    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
        data: {
            name,
            email, 
            password: hashedPassword
        },
        select: {
            id: true,
            name: true, 
            email: true,
            createdAt: true
        },
    });

    return user;
}