import express, { Request, Response } from "express";
import "dotenv/config";
import router from "./route";
import checkDataJSON from "./middleware";

const app = express();
app.use(express.json());
app.use(checkDataJSON);
app.use((req, res, next) => {
  const allowedOrigins = [process.env.ALLOWED_URL!];
  const origin = req.headers.origin;

  if (origin) {
    if (allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    }
  }
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  return next();
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use(router);

export default app;
