import FilterException from 'Error/FilterException';
import InvalidArgumentException from 'Error/InvalidArgumentException';
import StringFilter from 'Filter/StringFilter';

describe('StringFilter', () => {
  test.each([
    [{
      value: '',
      replaceVerticalWhitespace: undefined,
      expected: '',
      expectedError: undefined,
    }],
    [{
      value: ' a  \n  b \n c ',
      replaceVerticalWhitespace: undefined,
      expected: 'a \n b \n c',
      expectedError: undefined,
    }],
    [{
      value: ' a    \n b  c ',
      replaceVerticalWhitespace: false,
      expected: 'a \n b c',
      expectedError: undefined,
    }],
    [{
      value: ' a   \n   b  c  ',
      replaceVerticalWhitespace: true,
      expected: 'a b c',
      expectedError: undefined,
    }],
    [{
      value: '\na\nb\n\n\nc\n\n',
      replaceVerticalWhitespace: true,
      expected: 'a b c',
      expectedError: undefined,
    }],
    [{
      value: undefined,
      replaceVerticalWhitespace: undefined,
      expected: null,
      expectedError: undefined,
    }],
    [{
      value: null,
      replaceVerticalWhitespace: undefined,
      expected: null,
      expectedError: undefined,
    }],
    [{
      value: '',
      replaceVerticalWhitespace: {},
      expected: undefined,
      expectedError: new InvalidArgumentException('replaceVerticalWhitespace {} is not a boolean'),
    }],
    [{
      value: {},
      replaceVerticalWhitespace: undefined,
      expected: undefined,
      expectedError: new FilterException('Value {} cannot be cast to a string'),
    }],
  ])('StringFilter.compress(value, replaceVerticalWhitespace) | %j', (example) => {
    const {
      value,
      replaceVerticalWhitespace,
      expected,
      expectedError,
    } = example;
    let error: Error;
    let result: string;
    try {
      result = StringFilter.compress(value, replaceVerticalWhitespace);
    } catch (thrownError) {
      error = thrownError;
    }
    expect({ error, result }).toStrictEqual({
      error: expectedError,
      result: expected,
    });
  });

  test.each([
    [{
      value: '',
      prefix: undefined,
      suffix: undefined,
      expected: '',
      expectedError: undefined,
    }],
    [{
      value: 'val',
      prefix: undefined,
      suffix: undefined,
      expected: 'val',
      expectedError: undefined,
    }],
    [{
      value: 'val',
      prefix: 'before ',
      suffix: undefined,
      expected: 'before val',
      expectedError: undefined,
    }],
    [{
      value: 'val',
      prefix: undefined,
      suffix: ' after',
      expected: 'val after',
      expectedError: undefined,
    }],
    [{
      value: 'val',
      prefix: 'before ',
      suffix: ' after',
      expected: 'before val after',
      expectedError: undefined,
    }],
    [{
      value: '',
      prefix: {},
      suffix: undefined,
      expected: undefined,
      expectedError: new InvalidArgumentException('prefix {} is not a string'),
    }],
    [{
      value: '',
      prefix: undefined,
      suffix: {},
      expected: undefined,
      expectedError: new InvalidArgumentException('suffix {} is not a string'),
    }],
  ])('StringFilter.concat(value, prefix, suffix) | %j', (example) => {
    const {
      value,
      prefix,
      suffix,
      expected,
      expectedError,
    } = example;
    let error: Error;
    let result: string;
    try {
      result = StringFilter.concat(value, prefix, suffix);
    } catch (thrownError) {
      error = thrownError;
    }
    expect({ error, result }).toStrictEqual({
      error: expectedError,
      result: expected,
    });
  });

  test.each([
    [{
      value: 'val',
      allowNull: undefined,
      minLength: undefined,
      maxLength: undefined,
      expected: 'val',
      expectedError: undefined,
    }],
    [{
      value: 12345,
      allowNull: undefined,
      minLength: undefined,
      maxLength: undefined,
      expected: '12345',
      expectedError: undefined,
    }],
    [{
      value: '',
      allowNull: undefined,
      minLength: 0,
      maxLength: undefined,
      expected: '',
      expectedError: undefined,
    }],
    [{
      value: 'val',
      allowNull: undefined,
      minLength: 3,
      maxLength: 3,
      expected: 'val',
      expectedError: undefined,
    }],
    [{
      value: undefined,
      allowNull: true,
      minLength: undefined,
      maxLength: undefined,
      expected: null,
      expectedError: undefined,
    }],
    [{
      value: null,
      allowNull: true,
      minLength: undefined,
      maxLength: undefined,
      expected: null,
      expectedError: undefined,
    }],
    [{
      value: 'val',
      allowNull: {},
      minLength: undefined,
      maxLength: undefined,
      expected: undefined,
      expectedError: new InvalidArgumentException('allowNull {} is not a boolean'),
    }],
    [{
      value: 'val',
      allowNull: undefined,
      minLength: {},
      maxLength: undefined,
      expected: undefined,
      expectedError: new InvalidArgumentException('minLength {} is not a number'),
    }],
    [{
      value: 'val',
      allowNull: undefined,
      minLength: undefined,
      maxLength: {},
      expected: undefined,
      expectedError: new InvalidArgumentException('maxLength {} is not a number'),
    }],
    [{
      value: 'val',
      allowNull: undefined,
      minLength: -1,
      maxLength: undefined,
      expected: undefined,
      expectedError: new InvalidArgumentException('minLength was not a positive integer value'),
    }],
    [{
      value: 'val',
      allowNull: undefined,
      minLength: undefined,
      maxLength: -1,
      expected: undefined,
      expectedError: new InvalidArgumentException('maxLength was not a positive integer value'),
    }],
    [{
      value: null,
      allowNull: undefined,
      minLength: undefined,
      maxLength: undefined,
      expected: undefined,
      expectedError: new FilterException('Value failed filtering, allowNull is set to false'),
    }],
    [{
      value: undefined,
      allowNull: false,
      minLength: undefined,
      maxLength: undefined,
      expected: undefined,
      expectedError: new FilterException('Value failed filtering, allowNull is set to false'),
    }],
    [{
      value: null,
      allowNull: false,
      minLength: undefined,
      maxLength: undefined,
      expected: undefined,
      expectedError: new FilterException('Value failed filtering, allowNull is set to false'),
    }],
    [{
      value: {},
      allowNull: undefined,
      minLength: undefined,
      maxLength: undefined,
      expected: undefined,
      expectedError: new FilterException('Value {} cannot be cast to a string'),
    }],
    [{
      value: '',
      allowNull: undefined,
      minLength: undefined,
      maxLength: undefined,
      expected: undefined,
      expectedError: new FilterException('Value "" with length 0 is less than 1 or greater than Infinity'),
    }],
    [{
      value: 'val',
      allowNull: undefined,
      minLength: 4,
      maxLength: undefined,
      expected: undefined,
      expectedError: new FilterException('Value "val" with length 3 is less than 4 or greater than Infinity'),
    }],
    [{
      value: 'val',
      allowNull: undefined,
      minLength: undefined,
      maxLength: 2,
      expected: undefined,
      expectedError: new FilterException('Value "val" with length 3 is less than 1 or greater than 2'),
    }],
  ])('StringFilter.filter(value, allowNull, minLength, maxLength) | %j', (example) => {
    const {
      value,
      allowNull,
      minLength,
      maxLength,
      expected,
      expectedError,
    } = example;
    let error: Error;
    let result: string;
    try {
      result = StringFilter.filter(value, allowNull, minLength, maxLength);
    } catch (thrownError) {
      error = thrownError;
    }
    expect({ error, result }).toStrictEqual({
      error: expectedError,
      result: expected,
    });
  });

  test.each([
    [{
      value: 'this is a good, wholesome sentence',
      words: ['good', 'wholesome'],
      replacement: undefined,
      expected: 'this is a ,  sentence',
      expectedError: undefined,
    }],
    [{
      value: 'this is a good, wholesome sentence',
      words: ['good', 'wholesome'],
      replacement: '*',
      expected: 'this is a ****, ********* sentence',
      expectedError: undefined,
    }],
    [{
      value: 'this is a good, wholesome sentence',
      words: () => ['good', 'wholesome'],
      replacement: '___',
      expected: 'this is a ____, _________ sentence',
      expectedError: undefined,
    }],
    [{
      value: undefined,
      words: ['good', 'wholesome'],
      replacement: undefined,
      expected: null,
      expectedError: undefined,
    }],
    [{
      value: null,
      words: ['good', 'wholesome'],
      replacement: undefined,
      expected: null,
      expectedError: undefined,
    }],
    [{
      value: '',
      words: ['good', 'wholesome'],
      replacement: undefined,
      expected: '',
      expectedError: undefined,
    }],
    [{
      value: 'value',
      words: {},
      replacement: undefined,
      expected: undefined,
      expectedError: new InvalidArgumentException('words was not an array or a function that returns an array'),
    }],
    [{
      value: 'value',
      words: () => {},
      replacement: undefined,
      expected: undefined,
      expectedError: new InvalidArgumentException('words was not an array or a function that returns an array'),
    }],
    [{
      value: 'value',
      words: [],
      replacement: {},
      expected: undefined,
      expectedError: new InvalidArgumentException('replacement {} is not a string'),
    }],
    [{
      value: {},
      words: [],
      replacement: undefined,
      expected: undefined,
      expectedError: new FilterException('Value {} cannot be cast to a string'),
    }],
  ])('StringFilter.redact(value, words, replacement) | %j', (example) => {
    const {
      value,
      words,
      replacement,
      expected,
      expectedError,
    } = example;
    let error: Error;
    let result: string;
    try {
      result = StringFilter.redact(value, words, replacement);
    } catch (thrownError) {
      error = thrownError;
    }
    expect({ error, result }).toStrictEqual({
      error: expectedError,
      result: expected,
    });
  });

  test.each([
    [{
      value: '',
      delimiter: undefined,
      expected: [''],
      expectedError: undefined,
    }],
    [{
      value: 'a,b,c,',
      delimiter: undefined,
      expected: ['a', 'b', 'c', ''],
      expectedError: undefined,
    }],
    [{
      value: 'a-;-b-;-c',
      delimiter: '-;-',
      expected: ['a', 'b', 'c'],
      expectedError: undefined,
    }],
    [{
      value: 'a',
      delimiter: {},
      expected: undefined,
      expectedError: new InvalidArgumentException('delimiter {} is not a string'),
    }],
    [{
      value: 'a',
      delimiter: '',
      expected: undefined,
      expectedError: new InvalidArgumentException('delimiter "" is not a non-empty string'),
    }],
    [{
      value: {},
      delimiter: undefined,
      expected: undefined,
      expectedError: new FilterException('Value {} cannot be cast to a string'),
    }],
    [{
      value: undefined,
      delimiter: undefined,
      expected: undefined,
      expectedError: new FilterException('Value undefined is not a string'),
    }],
    [{
      value: null,
      delimiter: undefined,
      expected: undefined,
      expectedError: new FilterException('Value null is not a string'),
    }],
  ])('StringFilter.split(value, delimiter) | %j', (example) => {
    const {
      value,
      delimiter,
      expected,
      expectedError,
    } = example;
    let error: Error;
    let result: string[];
    try {
      result = StringFilter.split(value, delimiter);
    } catch (thrownError) {
      error = thrownError;
    }
    expect({ error, result }).toStrictEqual({
      error: expectedError,
      result: expected,
    });
  });

  test.each([
    [{
      value: undefined,
      replacement: undefined,
      expected: null,
      expectedError: undefined,
    }],
    [{
      value: null,
      replacement: undefined,
      expected: null,
      expectedError: undefined,
    }],
    [{
      value: 'some<br>html <b>in here</b>',
      replacement: undefined,
      expected: 'somehtml in here',
      expectedError: undefined,
    }],
    [{
      value: 'some<br>html <b>in here</b>',
      replacement: ' ',
      expected: 'some html  in here ',
      expectedError: undefined,
    }],
    [{
      value: '',
      replacement: {},
      expected: undefined,
      expectedError: new InvalidArgumentException('replacement {} is not a string'),
    }],
    [{
      value: {},
      replacement: undefined,
      expected: undefined,
      expectedError: new FilterException('Value {} cannot be cast to a string'),
    }],
  ])('StringFilter.stripTags(value, replacement) | %j', (example) => {
    const {
      value,
      replacement,
      expected,
      expectedError,
    } = example;
    let error: Error;
    let result: string;
    try {
      result = StringFilter.stripTags(value, replacement);
    } catch (thrownError) {
      error = thrownError;
    }
    expect({ error, result }).toStrictEqual({
      error: expectedError,
      result: expected,
    });
  });

  test.each([
    [{
      value: 'source',
      valueMap: { source: 'destination', other: 'value' },
      expected: 'destination',
      expectedError: undefined,
    }],
    [{
      value: '',
      valueMap: undefined,
      expected: undefined,
      expectedError: new InvalidArgumentException('valueMap undefined is not an object'),
    }],
    [{
      value: '',
      valueMap: null,
      expected: undefined,
      expectedError: new InvalidArgumentException('valueMap null is not an object'),
    }],
    [{
      value: '',
      valueMap: [],
      expected: undefined,
      expectedError: new InvalidArgumentException('valueMap [] is not an object'),
    }],
    [{
      value: '',
      valueMap: {},
      expected: undefined,
      expectedError: new FilterException('The value "" was not found in the translation map'),
    }],
    [{
      value: null,
      valueMap: {},
      expected: undefined,
      expectedError: new FilterException('Value null is not a string'),
    }],
  ])('StringFilter.translate(value, valueMap) | %j', (example) => {
    const {
      value,
      valueMap,
      expected,
      expectedError,
    } = example;
    let error: Error;
    let result: string;
    try {
      result = StringFilter.translate(value, valueMap);
    } catch (thrownError) {
      error = thrownError;
    }
    expect({ error, result }).toStrictEqual({
      error: expectedError,
      result: expected,
    });
  });
});
