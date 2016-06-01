const eslint  = require("eslint");
const fs      = require("fs");
const Mocha   = require("mocha");

const LINT_RULES = require("./rules.json");

class TestRunner {
  constructor() {
    this.mocha = new Mocha();
  }

  run(testNumber, cb) {
    const codeFile = this.getCodeFile(testNumber);
    const testFile = this.getTestFile(testNumber);
    let results = { errors: [] };
    
    results.lintResults = this.runLint(codeFile);
    
    try {
      this.runMocha(testFile)
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

  runLint(codeFile) {
    const lintOptions = { 
      rules: LINT_RULES,
      globals: { module: {} }
    };
    const code = fs.readFileSync(codeFile, "utf8");
    return eslint.linter.verify(code, lintOptions);
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
