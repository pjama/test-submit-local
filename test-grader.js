class TestGrader {
  
  constructor(decimals=1) {
    this.decimals = decimals;
  }
  
  getScore(results, maxScore=10) {
    const passes = results.testResults.passes
    const numTests = results.testResults.tests;
    const proportion =  passes / (numTests || 1); // avoid divide-by-zero
    const lintScore = this.getLintScore(results.lintResults);
    const testScore = this.roundScore(proportion * maxScore, this.decimals);
    let score = {
      testScore: testScore,
      lintScore: lintScore,
      total: testScore + lintScore
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
  
  roundScore(score, decimals) {
    return Math.round(score * Math.pow(10, decimals)) / Math.pow(10, decimals);
  }
}

module.exports = TestGrader;
