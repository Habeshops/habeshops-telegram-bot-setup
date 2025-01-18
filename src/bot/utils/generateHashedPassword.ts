import crypto from "crypto";

export const generateHashedPassword = (userId: number, username: string) => {
  return crypto
    .createHash("sha256")
    .update(`${userId}:${username}`)
    .digest("hex");
};
