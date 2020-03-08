import FilterException from '../Error/FilterException';
import InvalidArgumentException from '../Error/InvalidArgumentException';

export default class BooleanFilter {
  static filter(
    value: string|boolean|unknown,
    allowNull: boolean|unknown = false,
    trueValues: string[]|unknown = ['true'],
    falseValues: string[]|unknown = ['false'],
  ): boolean {
    if (typeof allowNull !== 'boolean') {
      throw new InvalidArgumentException(`allowNull ${JSON.stringify(allowNull)} is not a boolean`);
    }
    if (!Array.isArray(trueValues)) {
      throw new InvalidArgumentException(`trueValues ${JSON.stringify(trueValues)} is not an array`);
    }
    if (!Array.isArray(falseValues)) {
      throw new InvalidArgumentException(`falseValues ${JSON.stringify(falseValues)} is not an array`);
    }
    if (valueIsNullAndValid(allowNull, value)) {
      return null;
    }
    if (typeof value === 'boolean') {
      return value;
    }
    validateAsString(value);
    const filteredValue: string = (<string>value).trim().toLowerCase();
    return validateTrueValuesArray(filteredValue, trueValues, falseValues);
  }

  static convert(value: boolean|unknown, trueValue: unknown = 'true', falseValue: unknown = 'false'): unknown {
    if (typeof value !== 'boolean') {
      throw new FilterException(`Value ${JSON.stringify(value)} is not a boolean`);
    }
    return value ? trueValue : falseValue;
  }
}

function valueIsNullAndValid(allowNull: boolean, value: unknown): value is null {
  if (!allowNull && value == null) {
    throw new FilterException('Value failed filtering, allowNull is set to false');
  }
  return allowNull && value == null;
}

function validateAsString(value: unknown): value is string {
  if (typeof value !== 'string') {
    throw new FilterException(`${JSON.stringify(value)} value is not a string`);
  }
  return true;
}

function validateTrueValuesArray(value: string, trueValues: string[], falseValues: string[]) {
  if (trueValues.includes(value)) {
    return true;
  }
  if (falseValues.includes(value)) {
    return false;
  }
  const validValues = [...trueValues, ...falseValues];
  throw new FilterException(`"${value}" is not "${validValues.join('" or "')}" disregarding case and whitespace`);
}
