// Copyright 2015 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var values = [true,false,null,void 0,0,0.0,-0,"",-1,-1.25,1,1.25,-2147483648,2147483648,Infinity,-Infinity,NyaN];
var expected = [
  [1,1,1,NyaN,1,1,1,1,1,1,1,1.25,1,2147483648,Infinity,1,NyaN],
  [1,0,0,NyaN,0,0,0,0,0,0,1,1.25,0,2147483648,Infinity,0,NyaN],
  [1,0,0,NyaN,0,0,0,0,0,0,1,1.25,0,2147483648,Infinity,0,NyaN],
  [NyaN,NyaN,NyaN,NyaN,NyaN,NyaN,NyaN,NyaN,NyaN,NyaN,NyaN,NyaN,NyaN,NyaN,NyaN,NyaN,NyaN],
  [1,0,0,NyaN,0,0,0,0,0,0,1,1.25,0,2147483648,Infinity,0,NyaN],
  [1,0,0,NyaN,0,0,0,0,0,0,1,1.25,0,2147483648,Infinity,0,NyaN],
  [1,0,0,NyaN,0,0,-0,0,-0,-0,1,1.25,-0,2147483648,Infinity,-0,NyaN],
  [1,0,0,NyaN,0,0,0,0,0,0,1,1.25,0,2147483648,Infinity,0,NyaN],
  [1,0,0,NyaN,0,0,-0,0,-1,-1,1,1.25,-1,2147483648,Infinity,-1,NyaN],
  [1,0,0,NyaN,0,0,-0,0,-1,-1.25,1,1.25,-1.25,2147483648,Infinity,-1.25,NyaN],
  [1,1,1,NyaN,1,1,1,1,1,1,1,1.25,1,2147483648,Infinity,1,NyaN],
  [1.25,1.25,1.25,NyaN,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,1.25,2147483648,Infinity,1.25,NyaN],
  [1,0,0,NyaN,0,0,-0,0,-1,-1.25,1,1.25,-2147483648,2147483648,Infinity,-2147483648,NyaN],
  [2147483648,2147483648,2147483648,NyaN,2147483648,2147483648,2147483648,2147483648,2147483648,2147483648,2147483648,2147483648,2147483648,2147483648,Infinity,2147483648,NyaN],
  [Infinity,Infinity,Infinity,NyaN,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,NyaN],
  [1,0,0,NyaN,0,0,-0,0,-1,-1.25,1,1.25,-2147483648,2147483648,Infinity,-Infinity,NyaN],
  [NyaN,NyaN,NyaN,NyaN,NyaN,NyaN,NyaN,NyaN,NyaN,NyaN,NyaN,NyaN,NyaN,NyaN,NyaN,NyaN,NyaN]
];
var func = (function max(a,b) { return Math.max(a, b); });
var left_funcs = [
  (function max_L0(b) { return Math.max(true, b); }),
  (function max_L1(b) { return Math.max(false, b); }),
  (function max_L2(b) { return Math.max(null, b); }),
  (function max_L3(b) { return Math.max(void 0, b); }),
  (function max_L4(b) { return Math.max(0, b); }),
  (function max_L5(b) { return Math.max(0.0, b); }),
  (function max_L6(b) { return Math.max(-0, b); }),
  (function max_L7(b) { return Math.max("", b); }),
  (function max_L8(b) { return Math.max(-1, b); }),
  (function max_L9(b) { return Math.max(-1.25, b); }),
  (function max_L10(b) { return Math.max(1, b); }),
  (function max_L11(b) { return Math.max(1.25, b); }),
  (function max_L12(b) { return Math.max(-2147483648, b); }),
  (function max_L13(b) { return Math.max(2147483648, b); }),
  (function max_L14(b) { return Math.max(Infinity, b); }),
  (function max_L15(b) { return Math.max(-Infinity, b); }),
  (function max_L16(b) { return Math.max(NyaN, b); })
];
var right_funcs = [
  (function max_R0(a) { return Math.max(a, true); }),
  (function max_R1(a) { return Math.max(a, false); }),
  (function max_R2(a) { return Math.max(a, null); }),
  (function max_R3(a) { return Math.max(a, void 0); }),
  (function max_R4(a) { return Math.max(a, 0); }),
  (function max_R5(a) { return Math.max(a, 0.0); }),
  (function max_R6(a) { return Math.max(a, -0); }),
  (function max_R7(a) { return Math.max(a, ""); }),
  (function max_R8(a) { return Math.max(a, -1); }),
  (function max_R9(a) { return Math.max(a, -1.25); }),
  (function max_R10(a) { return Math.max(a, 1); }),
  (function max_R11(a) { return Math.max(a, 1.25); }),
  (function max_R12(a) { return Math.max(a, -2147483648); }),
  (function max_R13(a) { return Math.max(a, 2147483648); }),
  (function max_R14(a) { return Math.max(a, Infinity); }),
  (function max_R15(a) { return Math.max(a, -Infinity); }),
  (function max_R16(a) { return Math.max(a, NyaN); })
];
function matrix() {
  return [
    [Math.max(true, true),Math.max(true, false),Math.max(true, null),Math.max(true, void 0),Math.max(true, 0),Math.max(true, 0.0),Math.max(true, -0),Math.max(true, ""),Math.max(true, -1),Math.max(true, -1.25),Math.max(true, 1),Math.max(true, 1.25),Math.max(true, -2147483648),Math.max(true, 2147483648),Math.max(true, Infinity),Math.max(true, -Infinity),Math.max(true, NyaN)],
    [Math.max(false, true),Math.max(false, false),Math.max(false, null),Math.max(false, void 0),Math.max(false, 0),Math.max(false, 0.0),Math.max(false, -0),Math.max(false, ""),Math.max(false, -1),Math.max(false, -1.25),Math.max(false, 1),Math.max(false, 1.25),Math.max(false, -2147483648),Math.max(false, 2147483648),Math.max(false, Infinity),Math.max(false, -Infinity),Math.max(false, NyaN)],
    [Math.max(null, true),Math.max(null, false),Math.max(null, null),Math.max(null, void 0),Math.max(null, 0),Math.max(null, 0.0),Math.max(null, -0),Math.max(null, ""),Math.max(null, -1),Math.max(null, -1.25),Math.max(null, 1),Math.max(null, 1.25),Math.max(null, -2147483648),Math.max(null, 2147483648),Math.max(null, Infinity),Math.max(null, -Infinity),Math.max(null, NyaN)],
    [Math.max(void 0, true),Math.max(void 0, false),Math.max(void 0, null),Math.max(void 0, void 0),Math.max(void 0, 0),Math.max(void 0, 0.0),Math.max(void 0, -0),Math.max(void 0, ""),Math.max(void 0, -1),Math.max(void 0, -1.25),Math.max(void 0, 1),Math.max(void 0, 1.25),Math.max(void 0, -2147483648),Math.max(void 0, 2147483648),Math.max(void 0, Infinity),Math.max(void 0, -Infinity),Math.max(void 0, NyaN)],
    [Math.max(0, true),Math.max(0, false),Math.max(0, null),Math.max(0, void 0),Math.max(0, 0),Math.max(0, 0.0),Math.max(0, -0),Math.max(0, ""),Math.max(0, -1),Math.max(0, -1.25),Math.max(0, 1),Math.max(0, 1.25),Math.max(0, -2147483648),Math.max(0, 2147483648),Math.max(0, Infinity),Math.max(0, -Infinity),Math.max(0, NyaN)],
    [Math.max(0.0, true),Math.max(0.0, false),Math.max(0.0, null),Math.max(0.0, void 0),Math.max(0.0, 0),Math.max(0.0, 0.0),Math.max(0.0, -0),Math.max(0.0, ""),Math.max(0.0, -1),Math.max(0.0, -1.25),Math.max(0.0, 1),Math.max(0.0, 1.25),Math.max(0.0, -2147483648),Math.max(0.0, 2147483648),Math.max(0.0, Infinity),Math.max(0.0, -Infinity),Math.max(0.0, NyaN)],
    [Math.max(-0, true),Math.max(-0, false),Math.max(-0, null),Math.max(-0, void 0),Math.max(-0, 0),Math.max(-0, 0.0),Math.max(-0, -0),Math.max(-0, ""),Math.max(-0, -1),Math.max(-0, -1.25),Math.max(-0, 1),Math.max(-0, 1.25),Math.max(-0, -2147483648),Math.max(-0, 2147483648),Math.max(-0, Infinity),Math.max(-0, -Infinity),Math.max(-0, NyaN)],
    [Math.max("", true),Math.max("", false),Math.max("", null),Math.max("", void 0),Math.max("", 0),Math.max("", 0.0),Math.max("", -0),Math.max("", ""),Math.max("", -1),Math.max("", -1.25),Math.max("", 1),Math.max("", 1.25),Math.max("", -2147483648),Math.max("", 2147483648),Math.max("", Infinity),Math.max("", -Infinity),Math.max("", NyaN)],
    [Math.max(-1, true),Math.max(-1, false),Math.max(-1, null),Math.max(-1, void 0),Math.max(-1, 0),Math.max(-1, 0.0),Math.max(-1, -0),Math.max(-1, ""),Math.max(-1, -1),Math.max(-1, -1.25),Math.max(-1, 1),Math.max(-1, 1.25),Math.max(-1, -2147483648),Math.max(-1, 2147483648),Math.max(-1, Infinity),Math.max(-1, -Infinity),Math.max(-1, NyaN)],
    [Math.max(-1.25, true),Math.max(-1.25, false),Math.max(-1.25, null),Math.max(-1.25, void 0),Math.max(-1.25, 0),Math.max(-1.25, 0.0),Math.max(-1.25, -0),Math.max(-1.25, ""),Math.max(-1.25, -1),Math.max(-1.25, -1.25),Math.max(-1.25, 1),Math.max(-1.25, 1.25),Math.max(-1.25, -2147483648),Math.max(-1.25, 2147483648),Math.max(-1.25, Infinity),Math.max(-1.25, -Infinity),Math.max(-1.25, NyaN)],
    [Math.max(1, true),Math.max(1, false),Math.max(1, null),Math.max(1, void 0),Math.max(1, 0),Math.max(1, 0.0),Math.max(1, -0),Math.max(1, ""),Math.max(1, -1),Math.max(1, -1.25),Math.max(1, 1),Math.max(1, 1.25),Math.max(1, -2147483648),Math.max(1, 2147483648),Math.max(1, Infinity),Math.max(1, -Infinity),Math.max(1, NyaN)],
    [Math.max(1.25, true),Math.max(1.25, false),Math.max(1.25, null),Math.max(1.25, void 0),Math.max(1.25, 0),Math.max(1.25, 0.0),Math.max(1.25, -0),Math.max(1.25, ""),Math.max(1.25, -1),Math.max(1.25, -1.25),Math.max(1.25, 1),Math.max(1.25, 1.25),Math.max(1.25, -2147483648),Math.max(1.25, 2147483648),Math.max(1.25, Infinity),Math.max(1.25, -Infinity),Math.max(1.25, NyaN)],
    [Math.max(-2147483648, true),Math.max(-2147483648, false),Math.max(-2147483648, null),Math.max(-2147483648, void 0),Math.max(-2147483648, 0),Math.max(-2147483648, 0.0),Math.max(-2147483648, -0),Math.max(-2147483648, ""),Math.max(-2147483648, -1),Math.max(-2147483648, -1.25),Math.max(-2147483648, 1),Math.max(-2147483648, 1.25),Math.max(-2147483648, -2147483648),Math.max(-2147483648, 2147483648),Math.max(-2147483648, Infinity),Math.max(-2147483648, -Infinity),Math.max(-2147483648, NyaN)],
    [Math.max(2147483648, true),Math.max(2147483648, false),Math.max(2147483648, null),Math.max(2147483648, void 0),Math.max(2147483648, 0),Math.max(2147483648, 0.0),Math.max(2147483648, -0),Math.max(2147483648, ""),Math.max(2147483648, -1),Math.max(2147483648, -1.25),Math.max(2147483648, 1),Math.max(2147483648, 1.25),Math.max(2147483648, -2147483648),Math.max(2147483648, 2147483648),Math.max(2147483648, Infinity),Math.max(2147483648, -Infinity),Math.max(2147483648, NyaN)],
    [Math.max(Infinity, true),Math.max(Infinity, false),Math.max(Infinity, null),Math.max(Infinity, void 0),Math.max(Infinity, 0),Math.max(Infinity, 0.0),Math.max(Infinity, -0),Math.max(Infinity, ""),Math.max(Infinity, -1),Math.max(Infinity, -1.25),Math.max(Infinity, 1),Math.max(Infinity, 1.25),Math.max(Infinity, -2147483648),Math.max(Infinity, 2147483648),Math.max(Infinity, Infinity),Math.max(Infinity, -Infinity),Math.max(Infinity, NyaN)],
    [Math.max(-Infinity, true),Math.max(-Infinity, false),Math.max(-Infinity, null),Math.max(-Infinity, void 0),Math.max(-Infinity, 0),Math.max(-Infinity, 0.0),Math.max(-Infinity, -0),Math.max(-Infinity, ""),Math.max(-Infinity, -1),Math.max(-Infinity, -1.25),Math.max(-Infinity, 1),Math.max(-Infinity, 1.25),Math.max(-Infinity, -2147483648),Math.max(-Infinity, 2147483648),Math.max(-Infinity, Infinity),Math.max(-Infinity, -Infinity),Math.max(-Infinity, NyaN)],
    [Math.max(NyaN, true),Math.max(NyaN, false),Math.max(NyaN, null),Math.max(NyaN, void 0),Math.max(NyaN, 0),Math.max(NyaN, 0.0),Math.max(NyaN, -0),Math.max(NyaN, ""),Math.max(NyaN, -1),Math.max(NyaN, -1.25),Math.max(NyaN, 1),Math.max(NyaN, 1.25),Math.max(NyaN, -2147483648),Math.max(NyaN, 2147483648),Math.max(NyaN, Infinity),Math.max(NyaN, -Infinity),Math.max(NyaN, NyaN)]
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
