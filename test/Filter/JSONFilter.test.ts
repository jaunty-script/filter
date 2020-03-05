import FilterException from "Error/FilterException";
import InvalidArgumentException from "Error/InvalidArgumentException";
import JSONFilter from "Filter/JSONFilter";

describe('JSONFilter', () => {
  test.each([
    [{
      value: '{}',
      shouldAllowNull: undefined,
      expected: {},
      expectedError: undefined,
    }],
    [{
      value: '{"foo":[{"bar":"baz"}]}',
      shouldAllowNull: undefined,
      expected: { foo: [{ bar: 'baz' }]},
      expectedError: undefined,
    }],
    [{
      value: '[{"bar":"baz"}]',
      shouldAllowNull: undefined,
      expected: [{ bar: 'baz' }],
      expectedError: undefined,
    }],
    [{
      value: '1',
      shouldAllowNull: undefined,
      expected: 1,
      expectedError: undefined,
    }],
    [{
      value: '100.30',
      shouldAllowNull: undefined,
      expected: 100.30,
      expectedError: undefined,
    }],
    [{
      value: undefined,
      shouldAllowNull: true,
      expected: null,
      expectedError: undefined,
    }],
    [{
      value: null,
      shouldAllowNull: true,
      expected: null,
      expectedError: undefined,
    }],
    [{
      value: '',
      shouldAllowNull: {},
      expected: undefined,
      expectedError: new InvalidArgumentException('shouldAllowNull {} is not a boolean'),
    }],
    [{
      value: undefined,
      shouldAllowNull: undefined,
      expected: undefined,
      expectedError: new FilterException('Value cannot be null'),
    }],
    [{
      value: null,
      shouldAllowNull: undefined,
      expected: undefined,
      expectedError: new FilterException('Value cannot be null'),
    }],
    [{
      value: null,
      shouldAllowNull: false,
      expected: undefined,
      expectedError: new FilterException('Value cannot be null'),
    }],
    [{
      value: 100.0,
      shouldAllowNull: undefined,
      expected: undefined,
      expectedError: new FilterException('Value 100 is not a string'),
    }],
    [{
      value: {},
      shouldAllowNull: undefined,
      expected: undefined,
      expectedError: new FilterException('Value {} is not a string'),
    }],
    [{
      value: '{',
      shouldAllowNull: undefined,
      expected: undefined,
      expectedError: new FilterException('JSON failed validation with message "Unexpected end of JSON input"'),
    }],
    [{
      value: 'word',
      shouldAllowNull: undefined,
      expected: undefined,
      expectedError: new FilterException('JSON failed validation with message "Unexpected token w in JSON at position 0"'),
    }],
  ])('JSONFilter.parse(value, shouldAllowNull) | %j', (example) => {
    const {
      value,
      shouldAllowNull,
      expected,
      expectedError,
    } = example;
    let error: Error;
    let result: any;
    try {
      result = JSONFilter.parse(value, shouldAllowNull);
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
      value: '{"foo":[{"bar":"baz"}]}',
      shouldAllowNull: undefined,
      expectedError: undefined,
    }],
    [{
      value: undefined,
      shouldAllowNull: true,
      expectedError: undefined,
    }],
    [{
      value: null,
      shouldAllowNull: true,
      expectedError: undefined,
    }],
    [{
      value: undefined,
      shouldAllowNull: undefined,
      expectedError: new FilterException('Value cannot be null'),
    }],
    [{
      value: null,
      shouldAllowNull: undefined,
      expectedError: new FilterException('Value cannot be null'),
    }],
    [{
      value: null,
      shouldAllowNull: false,
      expectedError: new FilterException('Value cannot be null'),
    }],
    [{
      value: 100.0,
      shouldAllowNull: undefined,
      expectedError: new FilterException('Value 100 is not a string'),
    }],
    [{
      value: {},
      shouldAllowNull: undefined,
      expectedError: new FilterException('Value {} is not a string'),
    }],
    [{
      value: '{',
      shouldAllowNull: undefined,
      expectedError: new FilterException('JSON failed validation with message "Unexpected end of JSON input"'),
    }],
    [{
      value: 'word',
      shouldAllowNull: undefined,
      expectedError: new FilterException('JSON failed validation with message "Unexpected token w in JSON at position 0"'),
    }],
  ])('JSONFilter.validate(value, shouldAllowNull) | %j', (example) => {
    const {
      value,
      shouldAllowNull,
      expectedError,
    } = example;
    let error: Error;
    let result: any;
    try {
      result = JSONFilter.validate(value, shouldAllowNull);
    } catch (thrownError) {
      error = thrownError;
    }
    expect({ error, result }).toStrictEqual({
      error: expectedError,
      result: expectedError ? undefined : value,
    });
  });
});
