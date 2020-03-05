import FilterException from 'Error/FilterException';
import InvalidArgumentException from 'Error/InvalidArgumentException';

export default class DateFilter {
  static filter(value: Date|unknown, allowNull: boolean|unknown = false): Date {
    if (typeof allowNull !== 'boolean') {
      throw new InvalidArgumentException(`allowNull ${JSON.stringify(allowNull)} is not a boolean`);
    }
    if (valueIsNullAndValid(allowNull, value)) {
      return null;
    }
    if (value instanceof Date) {
      return value;
    }
    if (typeof value === 'number') {
      return new Date(value);
    }
    if (typeof value !== 'string' || value.trim() === '') {
      throw new FilterException(`${JSON.stringify(value)} is not a non-empty string`);
    }
    if (isInt(value)) {
      const parsedInteger = Number.parseInt(value, 10);
      return new Date(parsedInteger);
    }
    return new Date(value);
  }

  static format(date: Date|unknown, format: string|null|unknown): string {
    if (!(date instanceof Date)) {
      throw new FilterException(`date ${JSON.stringify(date)} is not a Date object`);
    }
    if (format != null && typeof format !== 'string') {
      throw new InvalidArgumentException(`format ${JSON.stringify(format)} is not a string`);
    }
    if (typeof format === 'string') {
      return date.toLocaleDateString(format);
    }
    return date.toLocaleDateString();
  }
}

function valueIsNullAndValid(allowNull: boolean, value: unknown): value is null {
  if (!allowNull && value == null) {
    throw new FilterException('Value failed filtering, allowNull is set to false');
  }
  return allowNull && value == null;
}

function isInt(value: string): boolean {
  return /^[+-]?\d+\.?\d*$/.test(value.replace(' ', ''));
}
