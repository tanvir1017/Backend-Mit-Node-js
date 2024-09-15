/* const http = require("http");
const fs = require("fs");

const server = http.createServer();
// creating a server using raw node.js

server.on("request", (req, res) => {
  if (req.url === "/read-file" && req.method === "GET") {
    // file reading like streaming
    //const readableStream = fs.createReadStream(__dirname + "/read/read.txt");
    const readableStream = fs.createReadStream(
      process.cwd() + "/read/read.txt"
    );

    readableStream.on("data", (buffer) => {
      res.write(buffer);
    });
    readableStream.on("end", () => {
      res.end("Streaming done!!");
    });
  }
});

// Listening from port

server.listen(5000, () => {
  console.log("listening from port 500");
});
 */

// * Practicing Streaming with raw node.js

const http = require("http");
const fs = require("fs");

const server = http.createServer(); // TODO: => initializing the http createServer and storing it into a variable called server

/**
 * @var Node.js
 * 1. Firstly we've to create a server by node.js default method/class called @http.createServer()
 * 2. We also have to @require the file system or @fs from node.js
 * 3. we've to read the request type or url after that we will read files text and do the streaming as practice
 *  */

// TODO: => Creating event and named it request
server.on("request", (req, res) => {
  if (req.url === "/read-file" && req.method === "GET") {
    //   TODO: => create readstream and giving it the file path
    const readableFile = fs.createReadStream(process.cwd() + "/read/read.txt");

    //   TODO: => making a event listener and writing buffer data from res
    readableFile.on("data", (buffer) => {
      res.write(buffer);
    });

    // after fishing listening or ending the process
    readableFile.on("end", () => {
      res.end("Stream done !");
    });
  }
});

// TODO: => listening to the events
server.listen(5000, () => {
  console.log("Listening from the port of 5000");
});
