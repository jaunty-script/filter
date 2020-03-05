import FilterException from 'Error/FilterException';
import FloatFilter from 'Filter/FloatFilter';
import InvalidArgumentException from 'Error/InvalidArgumentException';

describe('FloatFilter', () => {
  test.each([
    [{
      value: 2.5,
      allowNull: undefined,
      minValue: undefined,
      maxValue: undefined,
      expected: 2.5,
      expectedError: undefined,
    }],
    [{
      value: 2,
      allowNull: undefined,
      minValue: undefined,
      maxValue: undefined,
      expected: 2,
      expectedError: undefined,
    }],
    [{
      value: '0.88',
      allowNull: undefined,
      minValue: undefined,
      maxValue: undefined,
      expected: 0.88,
      expectedError: undefined,
    }],
    [{
      value: 2.1,
      allowNull: undefined,
      minValue: 2,
      maxValue: 3,
      expected: 2.1,
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
      value: Infinity,
      allowNull: undefined,
      minValue: undefined,
      maxValue: undefined,
      expected: undefined,
      expectedError: new FilterException('"Infinity" is not a finite number'),
    }],
    [{
      value: NaN,
      allowNull: undefined,
      minValue: undefined,
      maxValue: undefined,
      expected: undefined,
      expectedError: new FilterException('"NaN" is not a finite number'),
    }],
    [{
      value: 0,
      allowNull: undefined,
      minValue: 0.5,
      maxValue: undefined,
      expected: undefined,
      expectedError: new FilterException('0 is less than 0.5'),
    }],
    [{
      value: 1,
      allowNull: undefined,
      minValue: undefined,
      maxValue: 0.5,
      expected: undefined,
      expectedError: new FilterException('1 is greater than 0.5'),
    }],
    [{
      value: 'a',
      allowNull: undefined,
      minValue: undefined,
      maxValue: undefined,
      expected: undefined,
      expectedError: new FilterException('"a" is not a finite number'),
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
      value: undefined,
      allowNull: undefined,
      minValue: undefined,
      maxValue: undefined,
      expected: undefined,
      expectedError: new FilterException('undefined value is not a string'),
    }],
    [{
      value: null,
      allowNull: undefined,
      minValue: undefined,
      maxValue: undefined,
      expected: undefined,
      expectedError: new FilterException('null value is not a string'),
    }],
    [{
      value: null,
      allowNull: false,
      minValue: undefined,
      maxValue: undefined,
      expected: undefined,
      expectedError: new FilterException('null value is not a string'),
    }],
  ])('FloatFilter.filter(value, allowNull, minValue, maxValue) | %j', (example) => {
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
      result = FloatFilter.filter(value, allowNull, minValue, maxValue);
    } catch (thrownError) {
      error = thrownError;
    }
    expect({ error, result }).toStrictEqual({
      error: expectedError,
      result: expected,
    });
  });
});
