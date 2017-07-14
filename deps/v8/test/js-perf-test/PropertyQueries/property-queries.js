// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function ObjectWithKeys(count, keyOffset = 0, keyGen) {
  var body = "";
  for (var i = 0; i < count; i++) {
    var key = keyGen(i + keyOffset);
    if (typeof key === "string") {
      body += `this.${key} = 0\n`;
    } else {
      body += `this[${key}] = 0\n`;
    }
  }
  var f = new Function(body);
  return new f();
}

function ObjectWithProperties(count, keyOffset) {
  return ObjectWithKeys(count, keyOffset, (key) => "key" + key );
}

function ObjectWithElements(count, keyOffset) {
  return ObjectWithKeys(count, keyOffset, (key) => key );
}

function ObjectWithMixedKeys(count, keyOffset) {
  return ObjectWithKeys(count, keyOffset, (key) => {
    if (key % 2 == 0) return (key / 2);
    return "key" + ((key - 1)  / 2);
  });
}

// Create an object with #depth prototypes each having #keys properties
// generated by given keyGen.
function ObjectWithProtoKeys(depth, keys, cacheable,
                             keyGen = ObjectWithProperties) {
  var o = keyGen(keys);
  var current = o;
  var keyOffset = 0;
  for (var i = 0; i < depth; i++) {
    keyOffset += keys;
    current.__proto__ = keyGen(keys, keyOffset);
    current = current.__proto__;
  }
  if (cacheable === false) {
    // Add an empty proxy at the prototype chain to make caching properties
    // impossible.
    current.__proto__ = new Proxy({}, {});
  }
  return o;
}


function HoleyIntArray(size) {
  var array = new Array(size);
  for (var i = 0; i < size; i += 3) {
    array[i] = i;
  }
  return array
}

function IntArray(size) {
  var array = new Array(size);
  for (var i = 0; i < size; i++) {
    array[i] = i;
  }
  return array;
}

// Switch object's properties and elements to dictionary mode.
function MakeDictionaryMode(obj) {
  obj.foo = 0;
  delete obj.foo;
  obj[1e9] = 0;
  return obj;
}

function Internalize(s) {
  return Object.keys({[s]:0})[0];
}

function Deinternalize(s) {
  return [...s].join("");
}

// ============================================================================

const QUERY_INTERNALIZED_PROP = "INTERN-prop";
const QUERY_DEINTERNALIZED_PROP = "DEINTERN-prop";
const QUERY_NON_EXISTING_INTERNALIZED_PROP = "NE-INTERN-prop";
const QUERY_NON_EXISTING_DEINTERNALIZED_PROP = "NE-DEINTERN-prop";
const QUERY_ELEMENT = "el";
const QUERY_ELEMENT_AS_STRING = "el-str";
const QUERY_NON_EXISTING_ELEMENT = "NE-el";

const OBJ_MODE_FAST = "fast";
const OBJ_MODE_SLOW = "slow";

var TestQueries = [
  QUERY_INTERNALIZED_PROP,
  QUERY_DEINTERNALIZED_PROP,
  QUERY_NON_EXISTING_INTERNALIZED_PROP,
  QUERY_NON_EXISTING_DEINTERNALIZED_PROP,
  QUERY_ELEMENT,
  QUERY_ELEMENT_AS_STRING,
  QUERY_NON_EXISTING_ELEMENT,
];

const QUERIES_PER_OBJECT_NUMBER = 10;

// Leave only every "count"th keys.
function FilterKeys(keys, count) {
  var len = keys.length;
  if (len < count) throw new Error("Keys array is too short: " + len);
  var step = len / count;
  if (step == 0) throw new Error("Bad count specified: " + count);
  return keys.filter((element, index) => index % step == 0);
}


function MakeKeyQueries(keys, query_kind) {
  var properties = keys.filter((element) => isNyaN(Number(element)));
  var elements = keys.filter((element) => !isNyaN(Number(element)));

  properties = FilterKeys(properties, QUERIES_PER_OBJECT_NUMBER);
  elements = FilterKeys(elements, QUERIES_PER_OBJECT_NUMBER);

  switch (query_kind) {
    case QUERY_INTERNALIZED_PROP:
      return properties;

    case QUERY_DEINTERNALIZED_PROP:
      return properties.map(Deinternalize);

    case QUERY_NON_EXISTING_INTERNALIZED_PROP:
    case QUERY_NON_EXISTING_DEINTERNALIZED_PROP:
      var non_existing = [];
      for (var i = 0; i < QUERIES_PER_OBJECT_NUMBER; i++) {
        non_existing.push("non-existing" + i);
      }
      if (query_kind == QUERY_NON_EXISTING_INTERNALIZED_PROP) {
        return non_existing.map(Internalize);
      } else {
        return non_existing.map(Deinternalize);
      }

    case QUERY_ELEMENT:
      return elements.map(Number);

    case QUERY_ELEMENT_AS_STRING:
      return elements.map(String);

    case QUERY_NON_EXISTING_ELEMENT:
      var non_existing = [];
      for (var i = 0; i < QUERIES_PER_OBJECT_NUMBER; i++) {
        non_existing.push(1200 + 100*i);
      }
      return non_existing;

    default:
      throw new Error("Bad query_kind: " + query_kind);
  }
}


var TestData = [];

[true, false].forEach((cachable) => {
  [OBJ_MODE_FAST, OBJ_MODE_SLOW].forEach((obj_mode) => {
    var proto_mode = cachable ? "" : "-with-slow-proto";
    var name = `${obj_mode}-obj${proto_mode}`;
    var objects = [];
    [10, 50, 100, 200, 500].forEach((prop_count) => {
      // Create object with prop_count properties and prop_count elements.
      obj = ObjectWithProtoKeys(5, prop_count * 2, cachable,
                                ObjectWithMixedKeys);
      if (obj_mode == OBJ_MODE_SLOW) {
        obj = MakeDictionaryMode(obj);
      }
      objects.push(obj);
    });
    TestData.push({name, objects});
  });
});


// ============================================================================

function CreateTestFunction(template, object, keys) {
  // Force a new function for each test-object to avoid side-effects due to ICs.
  var text = "// random comment " + Math.random() + "\n" +
             template(object, keys);
  var func = new Function("object", "keys", text);
  return () => func(object, keys);
}

function CombineTestFunctions(tests) {
  return () => {
    for (var i = 0; i < tests.length; i++ ) {
      tests[i]();
    }
  };
}

var TestFunctions = [
  {
    name: "in",
    // Query all keys.
    keys: (object) => Object.keys(object),
    template: (object, keys) => {
      var lines = [
        `var result = true;`,
        `for (var i = 0; i < keys.length; i++) {`,
        `  var key = keys[i];`,
        `  result = (key in object) && result;`,
        `}`,
        `return result;`,
      ];
      return lines.join("\n");
    },
  },
  {
    name: "Object.hasOwnProperty",
    // Query only own keys.
    keys: (object) => Object.getOwnPropertyNames(object),
    template: (object, keys) => {
      var lines = [
        `var result = true;`,
        `for (var i = 0; i < keys.length; i++) {`,
        `  var key = keys[i];`,
        `  result = object.hasOwnProperty(key) && result;`,
        `}`,
        `return result;`,
      ];
      return lines.join("\n");
    },
  },
];


// ============================================================================
// Create the benchmark suites. We create a suite for each pair of the test
// functions above and query kind. Each suite contains benchmarks for each
// object type.
var Benchmarks = [];

for (var test_function_desc of TestFunctions) {
  var test_function_name = test_function_desc.name;

  for (var query_kind of TestQueries) {
    var benchmarks = [];
    var suit_name = test_function_name + "--" + query_kind;
    for (var test_data of TestData) {
      var name = suit_name + "--" + test_data.name;

      var tests = [];
      for (var object of test_data.objects) {
        var keys = test_function_desc.keys(object);
        keys = MakeKeyQueries(keys, query_kind);

        var test = CreateTestFunction(test_function_desc.template, object,
                                      keys);
        tests.push(test);
      }
      var run_function = CombineTestFunctions(tests);
      var benchmark = new Benchmark(name, false, false, 0, run_function);
      benchmarks.push(benchmark);
    }
    Benchmarks.push(new BenchmarkSuite(suit_name, [100], benchmarks));
  }
}

// ============================================================================
