import { prisma } from "../db/prisma.js";
import { generateApiKey, hashApiKey } from "../utils/apiKey.js";

export const createApiKey = async (projectId: string) => {
  const existingKey = await prisma.apiKey.findUnique({
    where: {
      projectId: projectId,
    },
  });

  if (existingKey) {
    throw new Error("Project already have an existing API Key");
  }

  const apiKey = generateApiKey();

  const keyHash = hashApiKey(apiKey);

  await prisma.apiKey.create({
    data: {
      projectId,
      keyHash,
    },
  });

  return apiKey;
};
