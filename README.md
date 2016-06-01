## Node-Mocha Test Runner

This tool provides a convenient way to test code for student-assessment purposes.

### Usage

Specify the test number using `npm`:

```terminal
npm run test 1
```

The above command would execute `test_01.js`.

### Directory Structure

The test spec files can be found in the `tests/` directory, and the corresponding code submission for testing is in the directory `lib/`.

The `lib/` files should export any functions or objects required for testing.

### Sample Output

Submission to the assessment server consists of two main categories: `lintResults` and `testResults` (from Mocha). The student's UUID, and the test number are also included in the results object:

```javascript
{ 
  testNumber: 1,
  lintResults:
   [ { ruleId: 'semi',
       severity: 1,
       message: 'Missing semicolon.',
       line: 9,
       column: 33,
       nodeType: 'ReturnStatement',
       source: '      return __arr.pop() || null',
       fix: [Object] } ],
  testResult:
   { suites: 1,
     tests: 2,
     passes: 1,
     pending: 0,
     failures: 1,
     start: "2016-06-01T16:07:31.452Z",
     end: "2016-06-01T16:07:31.466Z",
     duration: 14 },
  errors: [],
  uuid: '123'
}
```
