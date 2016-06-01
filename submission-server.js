/*
 * Listens to any POST requests and console.log body
 */

const http = require("http");
const fs = require("fs");
server = http.createServer( function(req, res) {

  console.dir(req.param);
  if (req.method == "POST") {
      console.log("POST");
      let body = "";
      req.on("data", function (data) {
          body += data;
      });
      req.on("end", function () {
          console.log("Body: " + body);
      });
      res.writeHead(200, {"Content-Type": "text/html"});
      res.end("post received");
  }
});

const port = 8080;
const host = "127.0.0.1";
server.listen(port, host);
console.log(`Listening at http://${host}:${port}`);
