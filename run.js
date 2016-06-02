const fs          = require("fs");

const SubmissionClient  = require("./submission-client");
const TestRunner        = require("./test-runner");

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
testRunner.run(testNumber, (err, results) => {
  results.uuid = uuid.trim();
  console.log("Submitting:", results);
  
  const submissionClient = new SubmissionClient();
  submissionClient.submit(results, (err, response, body) => {
    if (err) {
      console.error(err);
    }
    console.log("Response Body:", body);
  });
});
