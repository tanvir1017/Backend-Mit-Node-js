const fs = require("fs");

// Reading file text by asynchronous way

fs.readFile("./read/read.txt", "utf-8", (err, data) => {
  if (err) {
    throw Error("Error while reading file");
  }

  console.log(data);
});
