import express, { NextFunction, Request, Response, Router } from "express";
const app = express();

// parser
app.use(express.json());

// TODO => Middleware Example
const logger = (req: Request, res: Response, next: NextFunction): void => {
  console.log({
    url: req.url,
    method: req.method,
    hostname: req.hostname,
  });
  next();
};

// TODO => how to get query from req.query
app.get("/home", logger, (req: Request, res: Response) => {
  if (req.query.email && req.query.name) {
    const { email, name } = req.query;
    console.log("🚀 ~ app.get ~ name:", name);
    console.log("🚀 ~ app.get ~ email:", email);
  }
  res.json({
    message: "Hello world!",
  });
});

// TODO => how to get dynamic id from req.params
app.get("/home/:userId/:title", logger, (req: Request, res: Response) => {
  console.log(req.params);
  // console.log(req.query);
  res.end("Hello world!");
});

app.post("/", (req: Request, res: Response) => {
  console.log(req.body);
  res.send("get data");
});

// TODO => Creating api endpoint with Router Method
const router = Router();
// app.use(router);

app.get(
  "/api/data",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json({
        message: something,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// UNKNOWN Route // TODO => Global route handler should be after all of the route
app.all("*", (__req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// GLOBAL ERROR
app.use((error: any, __req: Request, res: Response, next: NextFunction) => {
  if (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }

  next();
});

export default app;
