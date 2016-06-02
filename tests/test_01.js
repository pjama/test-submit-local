const chai    = require("chai");
const sinon   = require("sinon");
const assert  = chai.assert;

const libModule = require("../lib/01.js");
const PushPopper = libModule.PushPopper;
const variableX = libModule.x;

describe("Function", () => {
  it("Should return null when popping an empty array", () => {
    const pp = new PushPopper();
    assert.deepEqual(pp.push(1), [1])
  });
  
  it("Should simply equal to twelve!", () => {
    assert.equal(variableX, 12);
  });
  
  it("Should not use Math.sqrt", () => {
    // let sqrtBack = Math.sqrt;
    let spySqrt = sinon.spy(Math, "sqrt");
    const pp = new PushPopper();
    pp.sqrt(4);
    sinon.assert.notCalled(spySqrt);
    Math.sqrt.restore();
  });
});
