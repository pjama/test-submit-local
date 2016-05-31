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
let testFile = "./tests/test_01.js";
testRunner.run(testFile, (err, results) => {
  console.log("results to be submitted:", results);
});
