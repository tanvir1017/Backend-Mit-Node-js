// ********** IMPORTING PACKAGES**********************
import cors from "cors";
import express, { Application } from "express";

// ** making app variable and store it into express functions
const app: Application = express();

// ** Parser
app.use(express.json());
app.use(cors());

//** Routing
app.get("/", (req, res) => {
  let b;

  res.json({ message: "Hello from the server!" });
});

app.get("/api/v1/", (__req, res) => {});

export default app;
