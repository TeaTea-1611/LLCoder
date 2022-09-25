import { sign } from "jsonwebtoken";
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} from "../constans/constans";

export const createTokens = (userId: number) => {
  const accessToken = sign({ userId: userId }, ACCESS_TOKEN_SECRET, {
    expiresIn: "5m",
  });
  const refreshToken = sign({ userId: userId }, REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
};
