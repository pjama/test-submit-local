const eslint  = require("eslint");
const fs      = require("fs");
const Mocha   = require("mocha");

const LINT_RULES = require("./rules.json");

class TestRunner {
  constructor() {
    this.mocha = new Mocha();
  }

  run(testNumber, cb) {    
    let results = {
      testNumber: parseInt(testNumber), 
      lintResults: this.runLint(testNumber),
      testResult: null, // Mocha, next step
      errors: []
    };
    
    try {
      this.runMocha(testNumber)
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

  runLint(testNumber) {
    const lintOptions = { 
      rules: LINT_RULES,
      globals: { module: {} }
    };
    const codeFile = this.getCodeFile(testNumber);
    const code = fs.readFileSync(codeFile, "utf8");
    return eslint.linter.verify(code, lintOptions);
  }
  
  runMocha(testNumber, cb) {
    const testFile = this.getTestFile(testNumber);
    return new Promise((resolve, reject) => {
      this.mocha.addFile(testFile);
      this.mocha
        .run()
        .on("end", function() {
          resolve(this.stats); // return test statistics
        });
    });
  }
  
  getCodeFile(testNumber) {
    let paddedNumber = this.padNumber(testNumber, 2);
    return `./lib/${paddedNumber}.js`;
  }
  
  getTestFile(testNumber) {
    let paddedNumber = this.padNumber(testNumber, 2);
    return `./tests/test_${paddedNumber}.js`;
  }
  
  padNumber(num, length) {
    var s = num+"";
    while (s.length < length) {
      s = "0" + s;
    }
    return s;
  }
}

module.exports = TestRunner;
