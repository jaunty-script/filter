import FilterException from '../Error/FilterException';
import InvalidArgumentException from '../Error/InvalidArgumentException';

export default class JSONFilter {
  static parse(value: string|unknown, shouldAllowNull: boolean|unknown = false): Object {
    if (typeof shouldAllowNull !== 'boolean') {
      throw new InvalidArgumentException(`shouldAllowNull ${JSON.stringify(shouldAllowNull)} is not a boolean`);
    }
    if (shouldAllowNull && value == null) {
      return null;
    }
    ensureValueIsString(value);
    try {
      return JSON.parse(<string>value);
    } catch (error) {
      throw new FilterException(`JSON failed validation with message "${error.message}"`);
    }
  }

  static validate(value: string|unknown, shouldAllowNull: boolean|unknown = false): string {
    JSONFilter.parse(value, shouldAllowNull);
    return <string>value;
  }
}

function ensureValueIsString(value: unknown): value is string {
  if (value == null) {
    throw new FilterException('Value cannot be null');
  }
  if (typeof value !== 'string') {
    throw new FilterException(`Value ${JSON.stringify(value)} is not a string`);
  }
  return true;
}
