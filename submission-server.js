/*
 * Listens to any POST requests and console.log body
 */

const http  = require("http");
const fs    = require("fs");

const TestGrader = require("./test-grader");

server = http.createServer( function(req, res) {

  console.dir(req.param);
  if (req.method == "POST") {
    console.log("POST");
    let body = "";
    req.on("data", function (data) {
      body += data;
    });
    req.on("end", function () {
      let results = JSON.parse(body);
      console.log("Body: ", results);
      const testGrader = new TestGrader(decimals=1);
      const score = testGrader.getScore(results, maxScore=9);
      res.writeHead(200, {"Content-Type": "application/json"});
      res.end(JSON.stringify(score));
    });
  }
});

const port = 8080;
const host = "127.0.0.1";
server.listen(port, host);
console.log(`Listening at http://${host}:${port}`);
