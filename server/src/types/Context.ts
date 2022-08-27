import { Request, Response } from "express";
import { Session } from "express-session";
import { Connection } from "typeorm";

export type Context = {
  req: Request & { session: Session & { uid?: number } };
  res: Response;
  connection: Connection;
};
