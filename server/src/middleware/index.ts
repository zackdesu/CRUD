import { NextFunction, Request, Response } from "express";
import fs from "fs";

const checkDataJSON = (req: Request, res: Response, next: NextFunction) =>
  fs.readFile("./data.json", "utf-8", (err) => {
    if (err) fs.writeFileSync("./data.json", "[]");
    next();
  });

export default checkDataJSON;
