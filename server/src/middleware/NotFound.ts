import { Request, Response } from "express";

const NOT_FOUND = (req: Request, res: Response) =>
  res.status(404).send("Route does not exist");

export default NOT_FOUND;
