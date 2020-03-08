import FilterException from '../Error/FilterException';
import InvalidArgumentException from '../Error/InvalidArgumentException';

export default class IntegerFilter {
  static filter(
    value: number|unknown,
    allowNull: boolean|unknown = false,
    minValue: number|unknown = Number.MIN_SAFE_INTEGER,
    maxValue: number|unknown = Number.MAX_SAFE_INTEGER,
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
    if (valueIsNullAndValid(allowNull, value)) {
      return null;
    }
    const valueInt = getValueInt(value);
    enforceMinimumValue(minValue, valueInt);
    enforceMaximumValue(maxValue, valueInt);
    return valueInt;
  }

  static unsigned(
    value: number|unknown,
    allowNull: boolean|unknown,
    minValue: number|unknown = 0,
    maxValue: number|unknown = Number.MAX_SAFE_INTEGER,
  ): number {
    if (minValue < 0) {
      throw new InvalidArgumentException(`${minValue} was not greater or equal to zero`);
    }
    const filteredValue = IntegerFilter.filter(value, allowNull, minValue, maxValue);
    if (filteredValue == null) {
      return filteredValue;
    }
    return Math.abs(filteredValue);
  }
}

function valueIsNullAndValid(allowNull: boolean, value: unknown): value is null {
  if (!allowNull && value == null) {
    throw new FilterException('Value failed filtering, allowNull is set to false');
  }
  return allowNull && value == null;
}

function getValueInt(value: unknown): number {
  if (typeof value === 'number') {
    if (Number.isNaN(value)) {
      throw new FilterException(`"${value}" is not a number`);
    }
    return Math.trunc(value);
  }
  if (typeof value === 'string') {
    return handleStringValues(value);
  }
  throw new FilterException(`${JSON.stringify(value)} value is not a string`);
}

function handleStringValues(value: string): number {
  const parsedValue = Number.parseInt(value, 10);
  if (Number.isNaN(parsedValue)) {
    throw new FilterException(`"${value}" is not a number`);
  }
  return parsedValue;
}

function enforceMinimumValue(minValue: number, valueInt: number) {
  if (valueInt < minValue) {
    throw new FilterException(`${valueInt} is less than ${minValue}`);
  }
}

function enforceMaximumValue(maxValue: number, valueInt: number) {
  if (valueInt > maxValue) {
    throw new FilterException(`${valueInt} is greater than ${maxValue}`);
  }
}
