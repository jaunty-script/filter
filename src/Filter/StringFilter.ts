import FilterException from 'Error/FilterException';
import InvalidArgumentException from 'Error/InvalidArgumentException';

export default class StringFilter {
  static compress(
    value: string|unknown,
    replaceVerticalWhitespace: boolean|unknown = false,
  ): string {
    if (typeof replaceVerticalWhitespace !== 'boolean') {
      throw new InvalidArgumentException(`replaceVerticalWhitespace ${JSON.stringify(replaceVerticalWhitespace)} is not a boolean`);
    }
    if (value == null) {
      return null;
    }
    validateIfObjectIsAString(value);
    const pattern = replaceVerticalWhitespace ? /\s+/g : /[^\S\r\n]+/g;
    return (<string>value).replace(pattern, ' ').trim();
  }

  static concat(
    value: string|unknown,
    prefix: string|unknown = '',
    suffix: string|unknown = '',
  ): string {
    if (typeof prefix !== 'string') {
      throw new InvalidArgumentException(`prefix ${JSON.stringify(prefix)} is not a string`);
    }
    if (typeof suffix !== 'string') {
      throw new InvalidArgumentException(`suffix ${JSON.stringify(suffix)} is not a string`);
    }
    validateIfObjectIsAString(value);
    return `${prefix}${value}${suffix}`;
  }

  static filter(
    value: string|unknown,
    allowNull: boolean|unknown = false,
    minLength: number|unknown = 1,
    maxLength: number|unknown = Infinity,
  ): string {
    if (typeof allowNull !== 'boolean') {
      throw new InvalidArgumentException(`allowNull ${JSON.stringify(allowNull)} is not a boolean`);
    }
    if (typeof minLength !== 'number') {
      throw new InvalidArgumentException(`minLength ${JSON.stringify(minLength)} is not a number`);
    }
    if (typeof maxLength !== 'number') {
      throw new InvalidArgumentException(`maxLength ${JSON.stringify(maxLength)} is not a number`);
    }
    validateMinimumLength(minLength);
    validateMaximumLength(maxLength);
    if (valueIsNullAndValid(allowNull, value)) {
      return null;
    }
    validateIfObjectIsAString(value);
    const filteredValue = `${value}`;
    validateStringLength(filteredValue, minLength, maxLength);
    return filteredValue;
  }

  static redact(
    value: string|unknown,
    words: string[]|Function|unknown,
    replacement: string|unknown = ''
  ): string {
    if (typeof replacement !== 'string') {
      throw new InvalidArgumentException(`replacement ${JSON.stringify(replacement)} is not a string`);
    }
    if (value == null) {
      return null;
    }
    if (value === '') {
      return value;
    }
    validateIfObjectIsAString(value);
    const filteredValue = `${value}`;
    if (typeof words === 'function') {
      words = words();
    }
    if (!Array.isArray(words)) {
      throw new InvalidArgumentException('words was not an array or a function that returns an array');
    }
    return replaceWordsWithReplacementString(filteredValue, words, replacement.charAt(0));
  }

  static split(value: string|unknown, delimiter: string|unknown = ','): string[] {
    if (typeof delimiter !== 'string') {
      throw new InvalidArgumentException(`delimiter ${JSON.stringify(delimiter)} is not a string`);
    }
    if (delimiter === '') {
      throw new InvalidArgumentException(`delimiter ${JSON.stringify(delimiter)} is not a non-empty string`);
    }
    validateIfObjectIsAString(value);
    const filteredValue = `${value}`;
    return filteredValue.split(delimiter);
  }

  static stripTags(value: string|unknown, replacement: string|unknown = ''): string {
    if (typeof replacement !== 'string') {
      throw new InvalidArgumentException(`replacement ${JSON.stringify(replacement)} is not a string`);
    }
    if (value == null) {
      return null;
    }
    validateIfObjectIsAString(value);
    const filteredValue = `${value}`;
    const findTagEntities = /<[^>]+?>/g;
    return filteredValue.replace(findTagEntities, replacement.charAt(0));
  }

  static translate(value: string|unknown, valueMap: Object|unknown): any {
    if (valueMap == null || Array.isArray(valueMap) || typeof valueMap !== 'object') {
      throw new InvalidArgumentException(`valueMap ${JSON.stringify(valueMap)} is not an object`);
    }
    validateIfObjectIsAString(value);
    const filteredValue = `${value}`;
    if (typeof valueMap[filteredValue] === 'undefined') {
      throw new FilterException(`The value "${value}" was not found in the translation map`);
    }
    return valueMap[filteredValue];
  }
}

function escapeRegExp(string: string): string {
  return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
}

function replaceWordsWithReplacementString(value: string, words: string[], replacement: string): string {
  return words.reduce((currentValue, word) => replaceWordWithReplacementString(currentValue, word, replacement), value);
}

function replaceWordWithReplacementString(value: string, word: string, replacement: string): string {
  const escapedWord = escapeRegExp(word);
  const caseInsensitiveWordPattern = new RegExp(`\\b${escapedWord}\\b`, 'gi');
  const replacementString = replacement.repeat(word.length);
  return value.replace(caseInsensitiveWordPattern, replacementString);
}

function validateIfObjectIsAString(value: unknown): value is string {
  if (typeof value === 'string') {
    return true;
  }
  if (value == null) {
    throw new FilterException(`Value ${value} is not a string`);
  }
  const defaultStringifiedValue = Object.prototype.toString.call(value);
  const stringifiedValue = `${value}`;
  if (defaultStringifiedValue === stringifiedValue) {
    throw new FilterException(`Value ${JSON.stringify(value)} cannot be cast to a string`);
  }
  return true;
}

function validateMaximumLength(maxLength: number) {
  if (maxLength < 0) {
    throw new InvalidArgumentException('maxLength was not a positive integer value');
  }
}

function validateMinimumLength(minLength: number) {
  if (minLength < 0) {
    throw new InvalidArgumentException('minLength was not a positive integer value');
  }
}

function validateStringLength(value: string, minLength: number, maxLength: number) {
  const valueLength = value.length;
  if (valueLength < minLength || valueLength > maxLength) {
    throw new FilterException(`Value "${value}" with length ${valueLength} is less than ${minLength} or greater than ${maxLength}`);
  }
}

function valueIsNullAndValid(allowNull: boolean, value: unknown): value is null {
  if (!allowNull && value == null) {
    throw new FilterException('Value failed filtering, allowNull is set to false');
  }
  return allowNull && value == null;
}
