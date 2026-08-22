import crypto from "node:crypto";

export const generateApiKey = () => {
  const randomPart = crypto.randomBytes(32).toString("hex");

  return `sk_live_${randomPart}`;
};

export const hashApiKey = (apiKey: string) => {
  return crypto.createHash("Sha256").update(apiKey).digest("hex");
};
