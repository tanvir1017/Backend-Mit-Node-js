import { Server } from "http";
import app from "./app";

const PORT = 5000;

let server: Server;

async function bootStartup() {
  server = app.listen(PORT, () => {
    console.log(`Server is running on port ${5000}`);
  });
}

bootStartup();
