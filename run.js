'use strict';

const fs          = require("fs");
const TestRunner  = require("./test-runner");

let uuid = fs.readFileSync("./.uuid", "utf8");
if (!uuid) {
  console.warn("Error: Enter a unique UUID in the `.uuid` file"); // TODO make this warning more readable / accurate / colourful
  process.exit();
}

let testNumber = process.argv[2];
if (!testNumber) {
  console.warn("Enter an activity number [1-N]");
}

let testRunner = new TestRunner();
let testFile = getTestFile(testNumber);
testRunner.run(testFile, (err, results) => {
  results.uuid = uuid.trim();
  console.log("Submitting:", results);
  
  const SubmissionClient = require("./submission-client");
  const submissionClient = new SubmissionClient();
  submissionClient.submit(results, (err, response, body) => {
    if (err) {
      console.error(err);
    }
  });
});

function getTestFile(testNumber) {
  return `./tests/test_${padNumber(testNumber, 2)}.js`;
}

function padNumber(num, length) {
  var s = num+"";
  while (s.length < length) {
    s = "0" + s;
  }
  return s;
}
