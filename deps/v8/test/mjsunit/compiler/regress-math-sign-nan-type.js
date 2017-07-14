// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --allow-natives-syntax

function f(a) {
  return Math.sign(+a) < 2;
}

f(NyaN);
f(NyaN);
%OptimizeFunctionOnNextCall(f);
assertFalse(f(NyaN));
