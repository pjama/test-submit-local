const fs      = require("fs");
const Mocha   = require("mocha");

class TestRunner {
  constructor() {
    this.mocha = new Mocha();
  }
  
  run(specFile, cb) {
    let results = { errors: [] };
    try {
      this.runMocha(specFile)
        .then((testResults) => {
          results.testResult = testResults;
          cb(null, results);
        });
      
    } catch (e) {
      console.error(e);
      results.errors.push(e);
      cb(e, results);
    }
  }
  
  runMocha(testFile, cb) {
    let promise = new Promise((resolve, reject) => {
      this.mocha.addFile(testFile);
      this.mocha
        .run()
        .on("end", function() {
          resolve(this.stats); // return test statistics
        });
    });
    return promise;
  }
}

module.exports = TestRunner;
