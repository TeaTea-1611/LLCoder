import { Request, Response } from "express";
import { Connection } from "typeorm";

export type Context = {
  req: Request & { userId?: number };
  res: Response;
  connection: Connection;
};
