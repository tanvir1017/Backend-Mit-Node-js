import express, { Request, Response } from "express";
const app = express();

// parser
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world!");
});

app.post("/", (req: Request, res: Response) => {
  console.log(req.body);
  res.send("get data");
});

export default app;
