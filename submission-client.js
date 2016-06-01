const request = require("request");
const SUBMISSION_URL = "http://127.0.0.1:8080/assessments/"; // TODO Update this submission URL

class SubmissionClient {
  submit(testResultData, cb) {
    request({
      url: SUBMISSION_URL,
      method: "POST",
      json: testResultData
    }, (err, response, body) => {
      
      cb(err, response, body);
    });
  }
}

module.exports = SubmissionClient;
