// ********** IMPORTING PACKAGES**********************
import cors from "cors";
import express, { Application, Request, Response } from "express";
import { StudentsRoute } from "./app/modules/student/student.route";

// ** making app variable and store it into express functions
const app: Application = express();

// ** Parser
app.use(express.json());
app.use(cors());

//** Routing
app.get("/", async (__req: Request, res: Response) => {
  res.status(200).json({ message: "Hello from the server!" });
});

// * App routes distributing from this application

// TODO => create student into DB

app.use("/api/v1/student", StudentsRoute);

export default app;
