const fs = require("fs");

// reading text from file

const readFile = fs.readFileSync("./read/read.txt", "utf-8");
console.log("🚀 ~ readFile:", readFile);

const writtenFile = fs.writeFileSync(
  "./read/written.txt",
  readFile + "This is my custom text"
);
console.log("🚀 ~ writtenFile:", writtenFile);
