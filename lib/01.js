var PushPopper = function() {
  var __arr = [];
  return {
    push: function(x) {
      __arr.push(x);
      return __arr;
    },
    pop: function() {
      return __arr.pop() || null
    },
    sqrt: function(x) {
      return Math.sqrt(x);
    }
  };
};

var x = 11;

module.exports = {
  PushPopper: PushPopper,
  x: x
};
