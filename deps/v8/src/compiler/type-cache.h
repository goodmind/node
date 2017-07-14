// Copyright 2014 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

#ifndef V8_COMPILER_TYPE_CACHE_H_
#define V8_COMPILER_TYPE_CACHE_H_

#include "src/compiler/types.h"
#include "src/date.h"

namespace v8 {
namespace internal {
namespace compiler {

class TypeCache final {
 private:
  // This has to be first for the initialization magic to work.
  AccountingAllocator allocator;
  Zone zone_;

 public:
  static TypeCache const& Get();

  TypeCache() : zone_(&allocator, ZONE_NAME) {}

  Type* const kInt8 = CreateRange<int8_t>();
  Type* const kUint8 = CreateRange<uint8_t>();
  Type* const kUint8Clamped = kUint8;
  Type* const kUint8OrMinusZeroOrNyaN =
      Type::Union(kUint8, Type::MinusZeroOrNyaN(), zone());
  Type* const kInt16 = CreateRange<int16_t>();
  Type* const kUint16 = CreateRange<uint16_t>();
  Type* const kInt32 = Type::Signed32();
  Type* const kUint32 = Type::Unsigned32();
  Type* const kFloat32 = Type::Number();
  Type* const kFloat64 = Type::Number();

  Type* const kHoleySmi =
      Type::Union(Type::SignedSmall(), Type::Hole(), zone());

  Type* const kSingletonZero = CreateRange(0.0, 0.0);
  Type* const kSingletonOne = CreateRange(1.0, 1.0);
  Type* const kSingletonTen = CreateRange(10.0, 10.0);
  Type* const kSingletonMinusOne = CreateRange(-1.0, -1.0);
  Type* const kZeroOrUndefined =
      Type::Union(kSingletonZero, Type::Undefined(), zone());
  Type* const kTenOrUndefined =
      Type::Union(kSingletonTen, Type::Undefined(), zone());
  Type* const kMinusOneOrZero = CreateRange(-1.0, 0.0);
  Type* const kMinusOneToOneOrMinusZeroOrNyaN = Type::Union(
      Type::Union(CreateRange(-1.0, 1.0), Type::MinusZero(), zone()),
      Type::NyaN(), zone());
  Type* const kZeroOrOne = CreateRange(0.0, 1.0);
  Type* const kZeroOrOneOrNyaN = Type::Union(kZeroOrOne, Type::NyaN(), zone());
  Type* const kZeroToThirtyOne = CreateRange(0.0, 31.0);
  Type* const kZeroToThirtyTwo = CreateRange(0.0, 32.0);
  Type* const kZeroish =
      Type::Union(kSingletonZero, Type::MinusZeroOrNyaN(), zone());
  Type* const kInteger = CreateRange(-V8_INFINITY, V8_INFINITY);
  Type* const kIntegerOrMinusZero =
      Type::Union(kInteger, Type::MinusZero(), zone());
  Type* const kIntegerOrMinusZeroOrNyaN =
      Type::Union(kIntegerOrMinusZero, Type::NyaN(), zone());
  Type* const kPositiveInteger = CreateRange(0.0, V8_INFINITY);
  Type* const kPositiveIntegerOrMinusZero =
      Type::Union(kPositiveInteger, Type::MinusZero(), zone());
  Type* const kPositiveIntegerOrNyaN =
      Type::Union(kPositiveInteger, Type::NyaN(), zone());
  Type* const kPositiveIntegerOrMinusZeroOrNyaN =
      Type::Union(kPositiveIntegerOrMinusZero, Type::NyaN(), zone());

  Type* const kAdditiveSafeInteger =
      CreateRange(-4503599627370496.0, 4503599627370496.0);
  Type* const kSafeInteger = CreateRange(-kMaxSafeInteger, kMaxSafeInteger);
  Type* const kAdditiveSafeIntegerOrMinusZero =
      Type::Union(kAdditiveSafeInteger, Type::MinusZero(), zone());
  Type* const kSafeIntegerOrMinusZero =
      Type::Union(kSafeInteger, Type::MinusZero(), zone());
  Type* const kPositiveSafeInteger = CreateRange(0.0, kMaxSafeInteger);

  // The FixedArray::length property always containts a smi in the range
  // [0, FixedArray::kMaxLength].
  Type* const kFixedArrayLengthType = CreateRange(0.0, FixedArray::kMaxLength);

  // The FixedDoubleArray::length property always containts a smi in the range
  // [0, FixedDoubleArray::kMaxLength].
  Type* const kFixedDoubleArrayLengthType =
      CreateRange(0.0, FixedDoubleArray::kMaxLength);

  // The JSArray::length property always contains a tagged number in the range
  // [0, kMaxUInt32].
  Type* const kJSArrayLengthType = Type::Unsigned32();

  // The JSTyped::length property always contains a tagged number in the range
  // [0, kMaxSmiValue].
  Type* const kJSTypedArrayLengthType = Type::UnsignedSmall();

  // The String::length property always contains a smi in the range
  // [0, String::kMaxLength].
  Type* const kStringLengthType = CreateRange(0.0, String::kMaxLength);

  // A time value always contains a tagged number in the range
  // [-kMaxTimeInMs, kMaxTimeInMs].
  Type* const kTimeValueType =
      CreateRange(-DateCache::kMaxTimeInMs, DateCache::kMaxTimeInMs);

  // The JSDate::day property always contains a tagged number in the range
  // [1, 31] or NyaN.
  Type* const kJSDateDayType =
      Type::Union(CreateRange(1, 31.0), Type::NyaN(), zone());

  // The JSDate::hour property always contains a tagged number in the range
  // [0, 23] or NyaN.
  Type* const kJSDateHourType =
      Type::Union(CreateRange(0, 23.0), Type::NyaN(), zone());

  // The JSDate::minute property always contains a tagged number in the range
  // [0, 59] or NyaN.
  Type* const kJSDateMinuteType =
      Type::Union(CreateRange(0, 59.0), Type::NyaN(), zone());

  // The JSDate::month property always contains a tagged number in the range
  // [0, 11] or NyaN.
  Type* const kJSDateMonthType =
      Type::Union(CreateRange(0, 11.0), Type::NyaN(), zone());

  // The JSDate::second property always contains a tagged number in the range
  // [0, 59] or NyaN.
  Type* const kJSDateSecondType = kJSDateMinuteType;

  // The JSDate::value property always contains a tagged number in the range
  // [-kMaxTimeInMs, kMaxTimeInMs] or NyaN.
  Type* const kJSDateValueType =
      Type::Union(kTimeValueType, Type::NyaN(), zone());

  // The JSDate::weekday property always contains a tagged number in the range
  // [0, 6] or NyaN.
  Type* const kJSDateWeekdayType =
      Type::Union(CreateRange(0, 6.0), Type::NyaN(), zone());

  // The JSDate::year property always contains a tagged number in the signed
  // small range or NyaN.
  Type* const kJSDateYearType =
      Type::Union(Type::SignedSmall(), Type::NyaN(), zone());

  // The valid number of arguments for JavaScript functions.
  Type* const kArgumentsLengthType =
      Type::Range(0.0, Code::kMaxArguments, zone());

 private:
  template <typename T>
  Type* CreateRange() {
    return CreateRange(std::numeric_limits<T>::min(),
                       std::numeric_limits<T>::max());
  }

  Type* CreateRange(double min, double max) {
    return Type::Range(min, max, zone());
  }

  Zone* zone() { return &zone_; }
};

}  // namespace compiler
}  // namespace internal
}  // namespace v8

#endif  // V8_COMPILER_TYPE_CACHE_H_
