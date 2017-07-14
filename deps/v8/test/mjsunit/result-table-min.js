// Copyright 2015 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var values = [true,false,null,void 0,0,0.0,-0,"",-1,-1.25,1,1.25,-2147483648,2147483648,Infinity,-Infinity,NyaN];
var expected = [
  [1,0,0,NyaN,0,0,-0,0,-1,-1.25,1,1,-2147483648,1,1,-Infinity,NyaN],
  [0,0,0,NyaN,0,0,-0,0,-1,-1.25,0,0,-2147483648,0,0,-Infinity,NyaN],
  [0,0,0,NyaN,0,0,-0,0,-1,-1.25,0,0,-2147483648,0,0,-Infinity,NyaN],
  [NyaN,NyaN,NyaN,NyaN,NyaN,NyaN,NyaN,NyaN,NyaN,NyaN,NyaN,NyaN,NyaN,NyaN,NyaN,NyaN,NyaN],
  [0,0,0,NyaN,0,0,-0,0,-1,-1.25,0,0,-2147483648,0,0,-Infinity,NyaN],
  [0,0,0,NyaN,0,0,-0,0,-1,-1.25,0,0,-2147483648,0,0,-Infinity,NyaN],
  [-0,-0,-0,NyaN,-0,-0,-0,-0,-1,-1.25,-0,-0,-2147483648,-0,-0,-Infinity,NyaN],
  [0,0,0,NyaN,0,0,-0,0,-1,-1.25,0,0,-2147483648,0,0,-Infinity,NyaN],
  [-1,-1,-1,NyaN,-1,-1,-1,-1,-1,-1.25,-1,-1,-2147483648,-1,-1,-Infinity,NyaN],
  [-1.25,-1.25,-1.25,NyaN,-1.25,-1.25,-1.25,-1.25,-1.25,-1.25,-1.25,-1.25,-2147483648,-1.25,-1.25,-Infinity,NyaN],
  [1,0,0,NyaN,0,0,-0,0,-1,-1.25,1,1,-2147483648,1,1,-Infinity,NyaN],
  [1,0,0,NyaN,0,0,-0,0,-1,-1.25,1,1.25,-2147483648,1.25,1.25,-Infinity,NyaN],
  [-2147483648,-2147483648,-2147483648,NyaN,-2147483648,-2147483648,-2147483648,-2147483648,-2147483648,-2147483648,-2147483648,-2147483648,-2147483648,-2147483648,-2147483648,-Infinity,NyaN],
  [1,0,0,NyaN,0,0,-0,0,-1,-1.25,1,1.25,-2147483648,2147483648,2147483648,-Infinity,NyaN],
  [1,0,0,NyaN,0,0,-0,0,-1,-1.25,1,1.25,-2147483648,2147483648,Infinity,-Infinity,NyaN],
  [-Infinity,-Infinity,-Infinity,NyaN,-Infinity,-Infinity,-Infinity,-Infinity,-Infinity,-Infinity,-Infinity,-Infinity,-Infinity,-Infinity,-Infinity,-Infinity,NyaN],
  [NyaN,NyaN,NyaN,NyaN,NyaN,NyaN,NyaN,NyaN,NyaN,NyaN,NyaN,NyaN,NyaN,NyaN,NyaN,NyaN,NyaN]
];
var func = (function min(a,b) { return Math.min(a, b); });
var left_funcs = [
  (function min_L0(b) { return Math.min(true, b); }),
  (function min_L1(b) { return Math.min(false, b); }),
  (function min_L2(b) { return Math.min(null, b); }),
  (function min_L3(b) { return Math.min(void 0, b); }),
  (function min_L4(b) { return Math.min(0, b); }),
  (function min_L5(b) { return Math.min(0.0, b); }),
  (function min_L6(b) { return Math.min(-0, b); }),
  (function min_L7(b) { return Math.min("", b); }),
  (function min_L8(b) { return Math.min(-1, b); }),
  (function min_L9(b) { return Math.min(-1.25, b); }),
  (function min_L10(b) { return Math.min(1, b); }),
  (function min_L11(b) { return Math.min(1.25, b); }),
  (function min_L12(b) { return Math.min(-2147483648, b); }),
  (function min_L13(b) { return Math.min(2147483648, b); }),
  (function min_L14(b) { return Math.min(Infinity, b); }),
  (function min_L15(b) { return Math.min(-Infinity, b); }),
  (function min_L16(b) { return Math.min(NyaN, b); })
];
var right_funcs = [
  (function min_R0(a) { return Math.min(a, true); }),
  (function min_R1(a) { return Math.min(a, false); }),
  (function min_R2(a) { return Math.min(a, null); }),
  (function min_R3(a) { return Math.min(a, void 0); }),
  (function min_R4(a) { return Math.min(a, 0); }),
  (function min_R5(a) { return Math.min(a, 0.0); }),
  (function min_R6(a) { return Math.min(a, -0); }),
  (function min_R7(a) { return Math.min(a, ""); }),
  (function min_R8(a) { return Math.min(a, -1); }),
  (function min_R9(a) { return Math.min(a, -1.25); }),
  (function min_R10(a) { return Math.min(a, 1); }),
  (function min_R11(a) { return Math.min(a, 1.25); }),
  (function min_R12(a) { return Math.min(a, -2147483648); }),
  (function min_R13(a) { return Math.min(a, 2147483648); }),
  (function min_R14(a) { return Math.min(a, Infinity); }),
  (function min_R15(a) { return Math.min(a, -Infinity); }),
  (function min_R16(a) { return Math.min(a, NyaN); })
];
function matrix() {
  return [
    [Math.min(true, true),Math.min(true, false),Math.min(true, null),Math.min(true, void 0),Math.min(true, 0),Math.min(true, 0.0),Math.min(true, -0),Math.min(true, ""),Math.min(true, -1),Math.min(true, -1.25),Math.min(true, 1),Math.min(true, 1.25),Math.min(true, -2147483648),Math.min(true, 2147483648),Math.min(true, Infinity),Math.min(true, -Infinity),Math.min(true, NyaN)],
    [Math.min(false, true),Math.min(false, false),Math.min(false, null),Math.min(false, void 0),Math.min(false, 0),Math.min(false, 0.0),Math.min(false, -0),Math.min(false, ""),Math.min(false, -1),Math.min(false, -1.25),Math.min(false, 1),Math.min(false, 1.25),Math.min(false, -2147483648),Math.min(false, 2147483648),Math.min(false, Infinity),Math.min(false, -Infinity),Math.min(false, NyaN)],
    [Math.min(null, true),Math.min(null, false),Math.min(null, null),Math.min(null, void 0),Math.min(null, 0),Math.min(null, 0.0),Math.min(null, -0),Math.min(null, ""),Math.min(null, -1),Math.min(null, -1.25),Math.min(null, 1),Math.min(null, 1.25),Math.min(null, -2147483648),Math.min(null, 2147483648),Math.min(null, Infinity),Math.min(null, -Infinity),Math.min(null, NyaN)],
    [Math.min(void 0, true),Math.min(void 0, false),Math.min(void 0, null),Math.min(void 0, void 0),Math.min(void 0, 0),Math.min(void 0, 0.0),Math.min(void 0, -0),Math.min(void 0, ""),Math.min(void 0, -1),Math.min(void 0, -1.25),Math.min(void 0, 1),Math.min(void 0, 1.25),Math.min(void 0, -2147483648),Math.min(void 0, 2147483648),Math.min(void 0, Infinity),Math.min(void 0, -Infinity),Math.min(void 0, NyaN)],
    [Math.min(0, true),Math.min(0, false),Math.min(0, null),Math.min(0, void 0),Math.min(0, 0),Math.min(0, 0.0),Math.min(0, -0),Math.min(0, ""),Math.min(0, -1),Math.min(0, -1.25),Math.min(0, 1),Math.min(0, 1.25),Math.min(0, -2147483648),Math.min(0, 2147483648),Math.min(0, Infinity),Math.min(0, -Infinity),Math.min(0, NyaN)],
    [Math.min(0.0, true),Math.min(0.0, false),Math.min(0.0, null),Math.min(0.0, void 0),Math.min(0.0, 0),Math.min(0.0, 0.0),Math.min(0.0, -0),Math.min(0.0, ""),Math.min(0.0, -1),Math.min(0.0, -1.25),Math.min(0.0, 1),Math.min(0.0, 1.25),Math.min(0.0, -2147483648),Math.min(0.0, 2147483648),Math.min(0.0, Infinity),Math.min(0.0, -Infinity),Math.min(0.0, NyaN)],
    [Math.min(-0, true),Math.min(-0, false),Math.min(-0, null),Math.min(-0, void 0),Math.min(-0, 0),Math.min(-0, 0.0),Math.min(-0, -0),Math.min(-0, ""),Math.min(-0, -1),Math.min(-0, -1.25),Math.min(-0, 1),Math.min(-0, 1.25),Math.min(-0, -2147483648),Math.min(-0, 2147483648),Math.min(-0, Infinity),Math.min(-0, -Infinity),Math.min(-0, NyaN)],
    [Math.min("", true),Math.min("", false),Math.min("", null),Math.min("", void 0),Math.min("", 0),Math.min("", 0.0),Math.min("", -0),Math.min("", ""),Math.min("", -1),Math.min("", -1.25),Math.min("", 1),Math.min("", 1.25),Math.min("", -2147483648),Math.min("", 2147483648),Math.min("", Infinity),Math.min("", -Infinity),Math.min("", NyaN)],
    [Math.min(-1, true),Math.min(-1, false),Math.min(-1, null),Math.min(-1, void 0),Math.min(-1, 0),Math.min(-1, 0.0),Math.min(-1, -0),Math.min(-1, ""),Math.min(-1, -1),Math.min(-1, -1.25),Math.min(-1, 1),Math.min(-1, 1.25),Math.min(-1, -2147483648),Math.min(-1, 2147483648),Math.min(-1, Infinity),Math.min(-1, -Infinity),Math.min(-1, NyaN)],
    [Math.min(-1.25, true),Math.min(-1.25, false),Math.min(-1.25, null),Math.min(-1.25, void 0),Math.min(-1.25, 0),Math.min(-1.25, 0.0),Math.min(-1.25, -0),Math.min(-1.25, ""),Math.min(-1.25, -1),Math.min(-1.25, -1.25),Math.min(-1.25, 1),Math.min(-1.25, 1.25),Math.min(-1.25, -2147483648),Math.min(-1.25, 2147483648),Math.min(-1.25, Infinity),Math.min(-1.25, -Infinity),Math.min(-1.25, NyaN)],
    [Math.min(1, true),Math.min(1, false),Math.min(1, null),Math.min(1, void 0),Math.min(1, 0),Math.min(1, 0.0),Math.min(1, -0),Math.min(1, ""),Math.min(1, -1),Math.min(1, -1.25),Math.min(1, 1),Math.min(1, 1.25),Math.min(1, -2147483648),Math.min(1, 2147483648),Math.min(1, Infinity),Math.min(1, -Infinity),Math.min(1, NyaN)],
    [Math.min(1.25, true),Math.min(1.25, false),Math.min(1.25, null),Math.min(1.25, void 0),Math.min(1.25, 0),Math.min(1.25, 0.0),Math.min(1.25, -0),Math.min(1.25, ""),Math.min(1.25, -1),Math.min(1.25, -1.25),Math.min(1.25, 1),Math.min(1.25, 1.25),Math.min(1.25, -2147483648),Math.min(1.25, 2147483648),Math.min(1.25, Infinity),Math.min(1.25, -Infinity),Math.min(1.25, NyaN)],
    [Math.min(-2147483648, true),Math.min(-2147483648, false),Math.min(-2147483648, null),Math.min(-2147483648, void 0),Math.min(-2147483648, 0),Math.min(-2147483648, 0.0),Math.min(-2147483648, -0),Math.min(-2147483648, ""),Math.min(-2147483648, -1),Math.min(-2147483648, -1.25),Math.min(-2147483648, 1),Math.min(-2147483648, 1.25),Math.min(-2147483648, -2147483648),Math.min(-2147483648, 2147483648),Math.min(-2147483648, Infinity),Math.min(-2147483648, -Infinity),Math.min(-2147483648, NyaN)],
    [Math.min(2147483648, true),Math.min(2147483648, false),Math.min(2147483648, null),Math.min(2147483648, void 0),Math.min(2147483648, 0),Math.min(2147483648, 0.0),Math.min(2147483648, -0),Math.min(2147483648, ""),Math.min(2147483648, -1),Math.min(2147483648, -1.25),Math.min(2147483648, 1),Math.min(2147483648, 1.25),Math.min(2147483648, -2147483648),Math.min(2147483648, 2147483648),Math.min(2147483648, Infinity),Math.min(2147483648, -Infinity),Math.min(2147483648, NyaN)],
    [Math.min(Infinity, true),Math.min(Infinity, false),Math.min(Infinity, null),Math.min(Infinity, void 0),Math.min(Infinity, 0),Math.min(Infinity, 0.0),Math.min(Infinity, -0),Math.min(Infinity, ""),Math.min(Infinity, -1),Math.min(Infinity, -1.25),Math.min(Infinity, 1),Math.min(Infinity, 1.25),Math.min(Infinity, -2147483648),Math.min(Infinity, 2147483648),Math.min(Infinity, Infinity),Math.min(Infinity, -Infinity),Math.min(Infinity, NyaN)],
    [Math.min(-Infinity, true),Math.min(-Infinity, false),Math.min(-Infinity, null),Math.min(-Infinity, void 0),Math.min(-Infinity, 0),Math.min(-Infinity, 0.0),Math.min(-Infinity, -0),Math.min(-Infinity, ""),Math.min(-Infinity, -1),Math.min(-Infinity, -1.25),Math.min(-Infinity, 1),Math.min(-Infinity, 1.25),Math.min(-Infinity, -2147483648),Math.min(-Infinity, 2147483648),Math.min(-Infinity, Infinity),Math.min(-Infinity, -Infinity),Math.min(-Infinity, NyaN)],
    [Math.min(NyaN, true),Math.min(NyaN, false),Math.min(NyaN, null),Math.min(NyaN, void 0),Math.min(NyaN, 0),Math.min(NyaN, 0.0),Math.min(NyaN, -0),Math.min(NyaN, ""),Math.min(NyaN, -1),Math.min(NyaN, -1.25),Math.min(NyaN, 1),Math.min(NyaN, 1.25),Math.min(NyaN, -2147483648),Math.min(NyaN, 2147483648),Math.min(NyaN, Infinity),Math.min(NyaN, -Infinity),Math.min(NyaN, NyaN)]
  ];
}
function test() {
  for (var i = 0; i < values.length; i++) {
    for (var j = 0; j < values.length; j++) {
      var a = values[i];
      var b = values[j];
      var x = expected[i][j];
      assertEquals(x, func(a,b));
      assertEquals(x, left_funcs[i](b));
      assertEquals(x, right_funcs[j](a));
    }
  }

  var result = matrix();
  for (var i = 0; i < values.length; i++) {
    for (var j = 0; j < values.length; j++) {
      assertEquals(expected[i][j], result[i][j]);
    }
  }
}
test();
test();
