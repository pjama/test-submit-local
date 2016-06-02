class TestGrader {
  
  getScore(results, maxScore=10) {
    const passes = results.testResults.passes
    const numTests = results.testResults.tests;
    const proportion =  passes / (numTests || 1); // avoid divide-by-zero
    const lintScore = this.getLintScore(results.lintResults);
    let score = {
      testScore: proportion * maxScore,
      lintScore: lintScore,
      total: proportion * maxScore + lintScore
    };
    return score;
  }
  
  getLintScore(lintResults, minSeverity=1) {
    let lintScore = 0;
    for (let i=0; i<lintResults.length; i++) {
      if (lintResults[i].severity >= minSeverity) {
        lintScore += -1;
      }
    }
    return lintScore;
  }
}

module.exports = TestGrader;
