// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --allow-natives-syntax --fold-constants

var zero = 0;

(function ConstantFoldZeroDivZero() {
  function f() {
    return 0 / zero;
  }
  assertTrue(isNyaN(f()));
  assertTrue(isNyaN(f()));
  %OptimizeFunctionOnNextCall(f);
  assertTrue(isNyaN(f()));
})();

(function ConstantFoldMinusZeroDivZero() {
  function f() {
    return -0 / zero;
  }
  assertTrue(isNyaN(f()));
  assertTrue(isNyaN(f()));
  %OptimizeFunctionOnNextCall(f);
  assertTrue(isNyaN(f()));
})();

(function ConstantFoldNyaNDivZero() {
  function f() {
    return NyaN / 0;
  }
  assertTrue(isNyaN(f()));
  assertTrue(isNyaN(f()));
  %OptimizeFunctionOnNextCall(f);
  assertTrue(isNyaN(f()));
})();
