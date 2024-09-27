import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

async function main() {
  try {
    await mongoose.connect(config.ATLAS_URI as string);
    // Listener
    app.listen(config.PORT, () => {
      console.log(`Server running on port ${config.PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
}

main();
// console.log({
//   processCWD: process.cwd(), // Only log the full folder where all the files are located
//   DirName: __dirname, // It will log the path with directory name
// });
