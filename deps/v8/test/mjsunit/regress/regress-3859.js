// Copyright 2015 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

assertEquals(1, new Set([NyaN, NyaN, NyaN]).size);
assertEquals(42, new Map([[NyaN, 42]]).get(NyaN));
