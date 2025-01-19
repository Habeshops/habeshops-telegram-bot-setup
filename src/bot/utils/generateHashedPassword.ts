import crypto from "crypto";

const secretKey = process.env.PASSWORD_HASH_SECRET;

export const generateHashedPassword = (userId: number, username: string) => {
  if (!secretKey) {
    throw new Error("Secret key for hashing is not defined.");
  }

  return crypto
    .createHash("sha256")
    .update(`${secretKey}:${userId}:${username}`)
    .digest("hex");
};