import FilterException from '../Error/FilterException';
import InvalidArgumentException from '../Error/InvalidArgumentException';

export default class ArrayFilter {
  static filter(
    value: any[]|unknown,
    minCount: number|unknown = 1,
    maxCount: number|unknown = Number.MAX_SAFE_INTEGER
  ): any[] {
    if (typeof minCount !== 'number') {
      throw new InvalidArgumentException(`minCount ${JSON.stringify(minCount)} is not a number`);
    }
    if (typeof maxCount !== 'number') {
      throw new InvalidArgumentException(`maxCount ${JSON.stringify(maxCount)} is not a number`);
    }
    if (!Array.isArray(value)) {
      throw new FilterException(`Value ${JSON.stringify(value)} is not an array`);
    }
    const count = value.length;
    if (count < minCount) {
      throw new FilterException(`value count of ${count} is less than ${minCount}`);
    }
    if (count > maxCount) {
      throw new FilterException(`value count of ${count} is greater than ${maxCount}`);
    }
    return value;
  }

  static in(value: any|unknown, haystack: any[]|unknown, strict: boolean|unknown = true) {
    if (!Array.isArray(haystack)) {
      throw new InvalidArgumentException(`haystack ${JSON.stringify(haystack)} is not an array`);
    }
    if (typeof strict !== 'boolean') {
      throw new InvalidArgumentException(`strict ${JSON.stringify(strict)} is not a boolean`);
    }
    if (!inArray(value, haystack, strict)) {
      throw new FilterException(`Value ${JSON.stringify(value)} is not in array ${JSON.stringify(haystack)}`);
    }
    return value;
  }

  static flatten(value: any[]|unknown): any[] {
    if (!Array.isArray(value)) {
      throw new FilterException(`${JSON.stringify(value)} is not an array`)
    }
    return value.flat(Infinity);
  }

  static arrayize<T>(value: T): T[] {
    if (value == null) {
      return [];
    }
    if (!Array.isArray(value)) {
      return [value];
    }
    return value;
  }
}

function inArray(value: any, haystack: any[], strict: boolean): boolean {
  if (strict) {
    return haystack.includes(value);
  }

  return haystack.some(arrayValue => value == arrayValue);
}
