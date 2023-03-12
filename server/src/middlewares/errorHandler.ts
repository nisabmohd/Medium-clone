import { NextFunction, Request, Response } from "express";
import ServerError from "../utils/ServerError";
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.message == "jwt expired")
    return res.status(401).send({ message: "UnAuthorized, JWT Expired" });
  if (err instanceof ServerError)
    res.status(err.statusCode).send({ message: err.message });
  else
    res.status(500).send({ message: err.message ?? "Internal Server Error" });
};
