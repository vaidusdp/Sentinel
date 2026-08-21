import { z } from "zod";

export const createProjectSchema = z.object({
  name: z.string().trim().min(2, "Project name must be at least 2 characters"),

  targetUrl: z.string().trim().url("Target URL must be a valid URL"),
});
