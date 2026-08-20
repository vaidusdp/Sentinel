import { prisma } from "../db/prisma.js";

interface CreateProjectInput {
    name: string,
    targetUrl: string
}

export const createProject = async (
    {name, targetUrl}: CreateProjectInput,
    ownerId: string
) => {
    const project = await prisma.project.create({
        data: {
            name,
            targetUrl,
            ownerId
        },
        select: {
            id: true,
            name: true,
            targetUrl: true,
            createdAt: true
        }
    });

    return project;
}