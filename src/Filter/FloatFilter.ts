import FilterException from 'Error/FilterException';
import InvalidArgumentException from 'Error/InvalidArgumentException';

export default class FloatFilter {
  static filter(
    value: number|unknown,
    allowNull: boolean|unknown = false,
    minValue: number|unknown = -Infinity,
    maxValue: number|unknown = Infinity,
  ): number {
    if (typeof allowNull !== 'boolean') {
      throw new InvalidArgumentException(`allowNull ${JSON.stringify(allowNull)} is not a boolean`);
    }
    if (typeof minValue !== 'number') {
      throw new InvalidArgumentException(`minValue ${JSON.stringify(minValue)} is not a number`);
    }
    if (typeof maxValue !== 'number') {
      throw new InvalidArgumentException(`maxValue ${JSON.stringify(maxValue)} is not a number`);
    }
    if (allowNull && value == null) {
      return null;
    }
    if (typeof value === 'number') {
      return ensureValueNotInfiniteAndInRange(value, value, minValue, maxValue);
    }
    if (typeof value === 'string') {
      const parsedValue = parseFloat(value);
      return ensureValueNotInfiniteAndInRange(value, parsedValue, minValue, maxValue);
    }
    throw new FilterException(`${JSON.stringify(value)} value is not a string`);
  }
}

function ensureValueNotInfiniteAndInRange(
  unfilteredValue: unknown,
  floatValue: number,
  minValue: number,
  maxValue: number,
): number {
  if (Number.isNaN(floatValue) || !Number.isFinite(floatValue)) {
    throw new FilterException(`"${unfilteredValue}" is not a finite number`);
  }
  return ensureValueInRange(floatValue, minValue, maxValue);
}

function ensureValueInRange(value: number, minValue: number, maxValue: number): number {
  if (value < minValue) {
    throw new FilterException(`${value} is less than ${minValue}`);
  }
  if (value > maxValue) {
    throw new FilterException(`${value} is greater than ${maxValue}`);
  }
  return value;
}
