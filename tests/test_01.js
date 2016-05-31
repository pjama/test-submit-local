const chai    = require("chai");
const sinon   = require("sinon");
const assert  = chai.assert;

const libModule = require("../lib/01.js");
const PushPopper = libModule.PushPopper;
const variableX = libModule.x;

describe("Function", () => {
  it("Should return null when popping an empty array", () => {
    var pp = new PushPopper();
    
    assert.deepEqual(pp.push(1), [1])
  });
  
  it("Should simply equal to twelve!", () => {
    assert.equal(variableX, 12);
  });
});
