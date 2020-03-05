import FilterException from "Error/FilterException";
import IntegerFilter from "Filter/IntegerFilter";
import InvalidArgumentException from "Error/InvalidArgumentException";

describe('IntegerFilter', () => {
  test.each([
    [{
      value: 1,
      allowNull: undefined,
      minValue: undefined,
      maxValue: undefined,
      expected: 1,
      expectedError: undefined,
    }],
    [{
      value: 1.2,
      allowNull: undefined,
      minValue: undefined,
      maxValue: undefined,
      expected: 1,
      expectedError: undefined,
    }],
    [{
      value: 55.5,
      allowNull: undefined,
      minValue: 55,
      maxValue: 56,
      expected: 55,
      expectedError: undefined,
    }],
    [{
      value: 56.000001,
      allowNull: undefined,
      minValue: 55,
      maxValue: 56,
      expected: 56,
      expectedError: undefined,
    }],
    [{
      value: '20',
      allowNull: undefined,
      minValue: undefined,
      maxValue: undefined,
      expected: 20,
      expectedError: undefined,
    }],
    [{
      value: '0.0001',
      allowNull: undefined,
      minValue: undefined,
      maxValue: undefined,
      expected: 0,
      expectedError: undefined,
    }],
    [{
      value: undefined,
      allowNull: true,
      minValue: undefined,
      maxValue: undefined,
      expected: null,
      expectedError: undefined,
    }],
    [{
      value: null,
      allowNull: true,
      minValue: undefined,
      maxValue: undefined,
      expected: null,
      expectedError: undefined,
    }],
    [{
      value: 1,
      allowNull: {},
      minValue: undefined,
      maxValue: undefined,
      expected: undefined,
      expectedError: new InvalidArgumentException('allowNull {} is not a boolean'),
    }],
    [{
      value: 1,
      allowNull: undefined,
      minValue: {},
      maxValue: undefined,
      expected: undefined,
      expectedError: new InvalidArgumentException('minValue {} is not a number'),
    }],
    [{
      value: 1,
      allowNull: undefined,
      minValue: undefined,
      maxValue: {},
      expected: undefined,
      expectedError: new InvalidArgumentException('maxValue {} is not a number'),
    }],
    [{
      value: undefined,
      allowNull: undefined,
      minValue: undefined,
      maxValue: undefined,
      expected: undefined,
      expectedError: new FilterException('Value failed filtering, allowNull is set to false'),
    }],
    [{
      value: null,
      allowNull: undefined,
      minValue: undefined,
      maxValue: undefined,
      expected: undefined,
      expectedError: new FilterException('Value failed filtering, allowNull is set to false'),
    }],
    [{
      value: null,
      allowNull: false,
      minValue: undefined,
      maxValue: undefined,
      expected: undefined,
      expectedError: new FilterException('Value failed filtering, allowNull is set to false'),
    }],
    [{
      value: 'a',
      allowNull: undefined,
      minValue: undefined,
      maxValue: undefined,
      expected: undefined,
      expectedError: new FilterException('"a" is not a number'),
    }],
    [{
      value: {},
      allowNull: undefined,
      minValue: undefined,
      maxValue: undefined,
      expected: undefined,
      expectedError: new FilterException('{} value is not a string'),
    }],
    [{
      value: Infinity,
      allowNull: undefined,
      minValue: undefined,
      maxValue: undefined,
      expected: undefined,
      expectedError: new FilterException(`Infinity is greater than ${Number.MAX_SAFE_INTEGER}`),
    }],
    [{
      value: NaN,
      allowNull: undefined,
      minValue: undefined,
      maxValue: undefined,
      expected: undefined,
      expectedError: new FilterException('"NaN" is not a number'),
    }],
    [{
      value: 0,
      allowNull: undefined,
      minValue: 1,
      maxValue: undefined,
      expected: undefined,
      expectedError: new FilterException('0 is less than 1'),
    }],
    [{
      value: 100,
      allowNull: undefined,
      minValue: undefined,
      maxValue: 99,
      expected: undefined,
      expectedError: new FilterException('100 is greater than 99'),
    }],
  ])('IntegerFilter.filter(value, allowNull, minValue, maxValue) | %j', (example) => {
    const {
      value,
      allowNull,
      minValue,
      maxValue,
      expected,
      expectedError,
    } = example;
    let error: Error;
    let result: number;
    try {
      result = IntegerFilter.filter(value, allowNull, minValue, maxValue);
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
      value: 0,
      allowNull: undefined,
      minValue: undefined,
      maxValue: undefined,
      expected: 0,
      expectedError: undefined,
    }],
    [{
      value: 0.00001,
      allowNull: undefined,
      minValue: undefined,
      maxValue: undefined,
      expected: 0,
      expectedError: undefined,
    }],
    [{
      value: -0.0001,
      allowNull: undefined,
      minValue: undefined,
      maxValue: undefined,
      expected: 0,
      expectedError: undefined,
    }],
    [{
      value: '0.001',
      allowNull: undefined,
      minValue: undefined,
      maxValue: undefined,
      expected: 0,
      expectedError: undefined,
    }],
    [{
      value: undefined,
      allowNull: true,
      minValue: undefined,
      maxValue: undefined,
      expected: null,
      expectedError: undefined,
    }],
    [{
      value: null,
      allowNull: true,
      minValue: undefined,
      maxValue: undefined,
      expected: null,
      expectedError: undefined,
    }],
    [{
      value: null,
      allowNull: true,
      minValue: undefined,
      maxValue: undefined,
      expected: null,
      expectedError: undefined,
    }],
    [{
      value: 100,
      allowNull: undefined,
      minValue: -1,
      maxValue: undefined,
      expected: undefined,
      expectedError: new InvalidArgumentException('-1 was not greater or equal to zero'),
    }],
    [{
      value: -1,
      allowNull: undefined,
      minValue: undefined,
      maxValue: undefined,
      expected: undefined,
      expectedError: new FilterException('-1 is less than 0'),
    }],
  ])('IntegerFilter.unsigned(value, allowNull, minValue, maxValue) | %j', (example) => {
    const {
      value,
      allowNull,
      minValue,
      maxValue,
      expected,
      expectedError,
    } = example;
    let error: Error;
    let result: number;
    try {
      result = IntegerFilter.unsigned(value, allowNull, minValue, maxValue);
    } catch (thrownError) {
      error = thrownError;
    }
    expect({ error, result }).toStrictEqual({
      error: expectedError,
      result: expected,
    });
  });
});
