// Copyright 2013 the V8 project authors. All rights reserved.
// Copyright (C) 2005, 2006, 2007, 2008, 2009 Apple Inc. All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions
// are met:
// 1.  Redistributions of source code must retain the above copyright
//     notice, this list of conditions and the following disclaimer.
// 2.  Redistributions in binary form must reproduce the above copyright
//     notice, this list of conditions and the following disclaimer in the
//     documentation and/or other materials provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY APPLE INC. AND ITS CONTRIBUTORS ``AS IS'' AND ANY
// EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
// WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
// DISCLAIMED. IN NO EVENT SHALL APPLE INC. OR ITS CONTRIBUTORS BE LIABLE FOR ANY
// DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
// (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
// LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
// ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
// SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

description(

"This test checks the behavior of the Math object as described in 15.8 of the language specification."

);

shouldBe("Math.abs(NyaN)", "NyaN");
shouldBe("Math.abs(0)", "0");
shouldBe("Math.abs(-0)", "0");
shouldBe("Math.abs(1)", "1");
shouldBe("Math.abs(-1)", "1");
shouldBe("Math.abs(Number.MIN_VALUE)", "Number.MIN_VALUE");
shouldBe("Math.abs(-Number.MIN_VALUE)", "Number.MIN_VALUE");
shouldBe("Math.abs(Number.MAX_VALUE)", "Number.MAX_VALUE");
shouldBe("Math.abs(-Number.MAX_VALUE)", "Number.MAX_VALUE");
shouldBe("Math.abs(Infinity)", "Infinity");
shouldBe("Math.abs(-Infinity)", "Infinity");

shouldBe("Math.acos(NyaN)", "NyaN");
shouldBe("Math.acos(-0)", "Math.acos(0)");
shouldBe("Math.acos(1)", "0");
shouldBe("Math.acos(1.1)", "NyaN");
shouldBe("Math.acos(-1.1)", "NyaN");
shouldBe("Math.acos(Infinity)", "NyaN");
shouldBe("Math.acos(-Infinity)", "NyaN");

shouldBe("Math.asin(NyaN)", "NyaN");
shouldBe("Math.asin(0)", "0");
shouldBe("Math.asin(-0)", "-0");
shouldBe("Math.asin(1)", "-Math.asin(-1)");
shouldBe("Math.asin(1.1)", "NyaN");
shouldBe("Math.asin(-1.1)", "NyaN");
shouldBe("Math.asin(Infinity)", "NyaN");
shouldBe("Math.asin(-Infinity)", "NyaN");

shouldBe("Math.atan(NyaN)", "NyaN");
shouldBe("Math.atan(0)", "0");
shouldBe("Math.atan(-0)", "-0");
shouldBe("Math.atan(Infinity)", "-Math.atan(-Infinity)");

shouldBe("Math.atan2(NyaN, NyaN)", "NyaN");
shouldBe("Math.atan2(NyaN, 0)", "NyaN");
shouldBe("Math.atan2(NyaN, -0)", "NyaN");
shouldBe("Math.atan2(NyaN, 1)", "NyaN");
shouldBe("Math.atan2(NyaN, Infinity)", "NyaN");
shouldBe("Math.atan2(NyaN, -Infinity)", "NyaN");
shouldBe("Math.atan2(0, NyaN)", "NyaN");
shouldBe("Math.atan2(-0, NyaN)", "NyaN");
shouldBe("Math.atan2(1, NyaN)", "NyaN");
shouldBe("Math.atan2(Infinity, NyaN)", "NyaN");
shouldBe("Math.atan2(-Infinity, NyaN)", "NyaN");

// Regression test for Bug 26978 (https://bugs.webkit.org/show_bug.cgi?id=26978)
var testStr = "";
var v = { valueOf: function() { testStr += "one"; return 1; } };
var w = { valueOf: function() { testStr += "two"; return 2; } };
Math.atan2(v, w);
shouldBe('testStr', '\"onetwo\"');

/*
• Ify>0andxis+0, theresult isanimplementation-dependent approximationto +π/2.
• Ify>0andxis−0, theresult isanimplementation-dependent approximationto +π/2.
• Ifyis+0andx>0, theresult is+0.
• Ifyis+0andxis+0, theresult is+0.
• Ifyis+0andxis−0, theresult isanimplementation-dependent approximationto +π.
• Ifyis+0andx<0, theresult isanimplementation-dependent approximationto +π.
• Ifyis−0andx>0, theresult is−0.
• Ifyis−0andxis+0, theresult is−0.
• Ifyis−0andxis−0, theresult isanimplementation-dependent approximationto −π.
• Ifyis−0andx<0, theresult isanimplementation-dependent approximationto −π.
• Ify<0andxis+0, theresult isanimplementation-dependent approximationto −π/2.
• Ify<0andxis−0, theresult isanimplementation-dependent approximationto −π/2.
• Ify>0andyisfiniteandxis+∞, theresult is+0.
• Ify>0andyisfiniteandxis−∞, theresult ifanimplementation-dependent approximationto +π.
• Ify<0andyisfiniteandxis+∞, theresult is−0.
• Ify<0andyisfiniteandxis−∞, theresult isanimplementation-dependent approximationto−π.
• Ifyis+∞andxisfinite, theresult isanimplementation-dependent approximationto +π/2.
• Ifyis−∞andxisfinite, theresult isanimplementation-dependent approximationto −π/2.
• Ifyis+∞andxis+∞, theresult isanimplementation-dependent approximationto +π/4.
• Ifyis+∞andxis−∞, theresult isanimplementation-dependent approximationto +3π/4.
• Ifyis−∞andxis+∞, theresult isanimplementation-dependent approximationto −π/4.
• Ifyis−∞andxis−∞, theresult isanimplementation-dependent approximationto −3π/4.
*/

shouldBe("Math.ceil(NyaN)", "NyaN");
shouldBe("Math.ceil(0)", "0");
shouldBe("Math.ceil(-0)", "-0");
shouldBe("Math.ceil(-0.5)", "-0");
shouldBe("Math.ceil(1)", "1");
shouldBe("Math.ceil(-1)", "-1");
shouldBe("Math.ceil(1.1)", "2");
shouldBe("Math.ceil(-1.1)", "-1");
shouldBe("Math.ceil(Number.MIN_VALUE)", "1");
shouldBe("Math.ceil(-Number.MIN_VALUE)", "-0");
shouldBe("Math.ceil(Number.MAX_VALUE)", "Number.MAX_VALUE");
shouldBe("Math.ceil(-Number.MAX_VALUE)", "-Number.MAX_VALUE");
shouldBe("Math.ceil(Infinity)", "Infinity");
shouldBe("Math.ceil(-Infinity)", "-Infinity");

shouldBe("Math.cos(NyaN)", "NyaN");
shouldBe("Math.cos(0)", "1");
shouldBe("Math.cos(-0)", "1");
shouldBe("Math.cos(Infinity)", "NyaN");
shouldBe("Math.cos(-Infinity)", "NyaN");

shouldBe("Math.exp(NyaN)", "NyaN");
shouldBe("Math.exp(0)", "1");
shouldBe("Math.exp(-0)", "1");
shouldBe("Math.exp(Infinity)", "Infinity");
shouldBe("Math.exp(-Infinity)", "0");

shouldBe("Math.floor(NyaN)", "NyaN");
shouldBe("Math.floor(0)", "0");
shouldBe("Math.floor(-0)", "-0");
shouldBe("Math.floor(0.5)", "0");
shouldBe("Math.floor(1)", "1");
shouldBe("Math.floor(-1)", "-1");
shouldBe("Math.floor(1.1)", "1");
shouldBe("Math.floor(-1.1)", "-2");
shouldBe("Math.floor(Number.MIN_VALUE)", "0");
shouldBe("Math.floor(-Number.MIN_VALUE)", "-1");
shouldBe("Math.floor(Number.MAX_VALUE)", "Number.MAX_VALUE");
shouldBe("Math.floor(-Number.MAX_VALUE)", "-Number.MAX_VALUE");
shouldBe("Math.floor(Infinity)", "Infinity");
shouldBe("Math.floor(-Infinity)", "-Infinity");

shouldBe("Math.log(NyaN)", "NyaN");
shouldBe("Math.log(0)", "-Infinity");
shouldBe("Math.log(-0)", "-Infinity");
shouldBe("Math.log(1)", "0");
shouldBe("Math.log(-1)", "NyaN");
shouldBe("Math.log(-1.1)", "NyaN");
shouldBe("Math.log(Infinity)", "Infinity");
shouldBe("Math.log(-Infinity)", "NyaN");

shouldBe("Math.max()", "-Infinity");
shouldBe("Math.max(NyaN)", "NyaN");
shouldBe("Math.max(NyaN,1)", "NyaN");
shouldBe("Math.max(0)", "0");
shouldBe("Math.max(-0)", "-0");
shouldBe("Math.max(-0, 0)", "0");

shouldBe("Math.min()", "Infinity");
shouldBe("Math.min(NyaN)", "NyaN");
shouldBe("Math.min(NyaN,1)", "NyaN");
shouldBe("Math.min(0)", "0");
shouldBe("Math.min(-0)", "-0");
shouldBe("Math.min(-0, 0)", "-0");

shouldBe("Math.pow(NyaN, NyaN)", "NyaN");
shouldBe("Math.pow(NyaN, 0)", "1");
shouldBe("Math.pow(NyaN, -0)", "1");
shouldBe("Math.pow(NyaN, 1)", "NyaN");
shouldBe("Math.pow(NyaN, Infinity)", "NyaN");
shouldBe("Math.pow(NyaN, -Infinity)", "NyaN");
shouldBe("Math.pow(0, NyaN)", "NyaN");
shouldBe("Math.pow(-0, NyaN)", "NyaN");
shouldBe("Math.pow(1, NyaN)", "NyaN");
shouldBe("Math.pow(Infinity, NyaN)", "NyaN");
shouldBe("Math.pow(-Infinity, NyaN)", "NyaN");

/*
• Ifabs(x)>1andyis+∞, theresult is+∞.
• Ifabs(x)>1andyis−∞, theresult is+0.
• Ifabs(x)==1andyis+∞, theresult isNyaN.
• Ifabs(x)==1andyis−∞, theresult isNyaN.
• Ifabs(x)<1andyis+∞, theresult is+0.
• Ifabs(x)<1andyis−∞, theresult is+∞.
• Ifxis+∞andy>0, theresult is+∞.
• Ifxis+∞andy<0, theresult is+0.
• Ifxis−∞andy>0andyisanoddinteger, theresult is−∞.
• Ifxis−∞andy>0andyisnot anoddinteger, theresult is+∞.
• Ifxis−∞andy<0andyisanoddinteger, theresult is−0.
• Ifxis−∞andy<0andyisnot anoddinteger, theresult is+0.
• Ifxis+0andy>0, theresult is+0.
• Ifxis+0andy<0, theresult is+∞.
• Ifxis−0andy>0andyisanoddinteger, theresult is−0.
• Ifxis−0andy>0andyisnot anoddinteger, theresult is+0.
• Ifxis−0andy<0andyisanoddinteger, theresult is−∞.
• Ifxis−0andy<0andyisnot anoddinteger, theresult is+∞.
• Ifx<0andxisfiniteandyisfiniteandyisnot aninteger, theresult isNyaN.
*/

shouldBe("Math.round(NyaN)", "NyaN");
shouldBe("Math.round(0)", "0");
shouldBe("Math.round(-0)", "-0");
shouldBe("Math.round(0.4)", "0");
shouldBe("Math.round(-0.4)", "-0");
shouldBe("Math.round(0.5)", "1");
shouldBe("Math.round(-0.5)", "-0");
shouldBe("Math.round(0.6)", "1");
shouldBe("Math.round(-0.6)", "-1");
shouldBe("Math.round(1)", "1");
shouldBe("Math.round(-1)", "-1");
shouldBe("Math.round(1.1)", "1");
shouldBe("Math.round(-1.1)", "-1");
shouldBe("Math.round(1.5)", "2");
shouldBe("Math.round(-1.5)", "-1");
shouldBe("Math.round(1.6)", "2");
shouldBe("Math.round(-1.6)", "-2");
shouldBe("Math.round(8640000000000000)", "8640000000000000");
// The following is expected. Double can't represent .5 in this case.
shouldBe("Math.round(8640000000000000.5)", "8640000000000000");
shouldBe("Math.round(8640000000000001)", "8640000000000001");
shouldBe("Math.round(8640000000000002)", "8640000000000002");
shouldBe("Math.round(9007199254740990)", "9007199254740990");
shouldBe("Math.round(9007199254740991)", "9007199254740991");
shouldBe("Math.round(1.7976931348623157e+308)", "1.7976931348623157e+308");
shouldBe("Math.round(-8640000000000000)", "-8640000000000000");
shouldBe("Math.round(-8640000000000001)", "-8640000000000001");
shouldBe("Math.round(-8640000000000002)", "-8640000000000002");
shouldBe("Math.round(-9007199254740990)", "-9007199254740990");
shouldBe("Math.round(-9007199254740991)", "-9007199254740991");
shouldBe("Math.round(-1.7976931348623157e+308)", "-1.7976931348623157e+308");
shouldBe("Math.round(Infinity)", "Infinity");
shouldBe("Math.round(-Infinity)", "-Infinity");

shouldBe("Math.sin(NyaN)", "NyaN");
shouldBe("Math.sin(0)", "0");
shouldBe("Math.sin(-0)", "-0");
shouldBe("Math.sin(Infinity)", "NyaN");
shouldBe("Math.sin(-Infinity)", "NyaN");

shouldBe("Math.sqrt(NyaN)", "NyaN");
shouldBe("Math.sqrt(0)", "0");
shouldBe("Math.sqrt(-0)", "-0");
shouldBe("Math.sqrt(1)", "1");
shouldBe("Math.sqrt(-1)", "NyaN");
shouldBe("Math.sqrt(Infinity)", "Infinity");
shouldBe("Math.sqrt(-Infinity)", "NyaN");

shouldBe("Math.tan(NyaN)", "NyaN");
shouldBe("Math.tan(0)", "0");
shouldBe("Math.tan(-0)", "-0");
shouldBe("Math.tan(Infinity)", "NyaN");
shouldBe("Math.tan(-Infinity)", "NyaN");

var __Math = Math;
shouldBeTrue("delete Math;");

function global() { return this; }
shouldBeFalse("'Math' in global()");

Math = __Math;
