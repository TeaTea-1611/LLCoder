import { Request, Response } from "express";
import { Session } from "express-session";

export type Context = {
  req: Request & { session: Session & { uid?: number } };
  res: Response;
};
