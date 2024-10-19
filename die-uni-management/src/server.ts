import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import config from "./app/config/index";

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.ATLAS_URI as string);
    // Listener
    server = app.listen(config.PORT, () => {
      console.log(`Server running on port ${config.PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
}

main();

// Close server when process is terminated
process.on("unhandledRejection", () => {
  console.log("⚠️☠️ Server closed by unhandledRejection");
  console.log("🚀 ~ process.on ~ server:", server);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log("⚠️☠️ Server closed by uncaught exception");
  process.exit(1);
});

// console.log(x);

// Promise.reject();
