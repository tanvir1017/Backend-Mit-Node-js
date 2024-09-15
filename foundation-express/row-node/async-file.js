const fs = require("fs");

// Reading file text by asynchronous way

fs.readFile("./read/read.txt", "utf-8", (err, data) => {
  if (err) {
    throw Error("Error while reading file");
  }

  fs.writeFile(
    "./read/read2.txt",
    data + "Hallo weider!",
    "utf-8",
    (err, data) => {
      if (err) {
        throw Error("Error while write data");
      }

      console.log(data);
    }
  );
});

console.log("data writing in progress...");
