import { redis } from "../redis";
import { v4 as uuidv4 } from "uuid";
import {
  forgotPasswordPrefix,
  userConfirmationPrefix,
} from "../constans/redisPrefixed";

const frontendUrl = process.env.FRONTEND_URL;

export const createConfirmationUrl = async (
  uid: number,
  type: "user-confirmation" | "forgot-password"
) => {
  const token = uuidv4();
  let prefix = "";
  switch (type) {
    case "user-confirmation":
      prefix = userConfirmationPrefix;
      break;
    case "forgot-password":
      prefix = forgotPasswordPrefix;
      break;
  }
  await redis.set(prefix + token, uid, "EX", 60 * 60 * 24); // 1 day

  return `${frontendUrl}/user/confirm/${token}`;
};
