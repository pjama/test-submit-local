const request = require("request");
// const SUBMISSION_URL = "http://compass.lighthouselabs.ca/assessments/";
const SUBMISSION_URL = "http://127.0.0.1:8080/assessments/";

class SubmissionClient {
  constructor() { }
  
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
