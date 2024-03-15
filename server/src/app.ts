import express, { Request, Response } from "express";
import "dotenv/config";
import router from "./route";
import checkDataJSON from "./middleware";

const app = express();
app.use(express.json());
app.use(checkDataJSON);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use(router);

export default app;
