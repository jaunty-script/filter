import BooleanFilter from 'Filter/BooleanFilter';
import FilterException from 'Error/FilterException';
import InvalidArgumentException from 'Error/InvalidArgumentException';

describe('BooleanFilter', () => {
  test.each([
    [{
      value: true,
      allowNull: undefined,
      trueValues: undefined,
      falseValues: undefined,
      expected: true,
      expectedError: undefined,
    }],
    [{
      value: false,
      allowNull: undefined,
      trueValues: undefined,
      falseValues: undefined,
      expected: false,
      expectedError: undefined,
    }],
    [{
      value: 'true',
      allowNull: undefined,
      trueValues: undefined,
      falseValues: undefined,
      expected: true,
      expectedError: undefined,
    }],
    [{
      value: 'false',
      allowNull: undefined,
      trueValues: undefined,
      falseValues: undefined,
      expected: false,
      expectedError: undefined,
    }],
    [{
      value: undefined,
      allowNull: true,
      trueValues: undefined,
      falseValues: undefined,
      expected: null,
      expectedError: undefined,
    }],
    [{
      value: null,
      allowNull: true,
      trueValues: undefined,
      falseValues: undefined,
      expected: null,
      expectedError: undefined,
    }],
    [{
      value: 'a',
      allowNull: false,
      trueValues: ['a'],
      falseValues: undefined,
      expected: true,
      expectedError: undefined,
    }],
    [{
      value: 'a',
      allowNull: false,
      trueValues: undefined,
      falseValues: ['b', 'a'],
      expected: false,
      expectedError: undefined,
    }],
    [{
      value: 'b',
      allowNull: false,
      trueValues: undefined,
      falseValues: ['a', 'b'],
      expected: false,
      expectedError: undefined,
    }],
    [{
      value: true,
      allowNull: {},
      trueValues: undefined,
      falseValues: undefined,
      expected: undefined,
      expectedError: new InvalidArgumentException('allowNull {} is not a boolean'),
    }],
    [{
      value: true,
      allowNull: undefined,
      trueValues: {},
      falseValues: undefined,
      expected: undefined,
      expectedError: new InvalidArgumentException('trueValues {} is not an array'),
    }],
    [{
      value: true,
      allowNull: undefined,
      trueValues: undefined,
      falseValues: {},
      expected: undefined,
      expectedError: new InvalidArgumentException('falseValues {} is not an array'),
    }],
    [{
      value: null,
      allowNull: undefined,
      trueValues: undefined,
      falseValues: undefined,
      expected: undefined,
      expectedError: new FilterException('Value failed filtering, allowNull is set to false'),
    }],
    [{
      value: null,
      allowNull: false,
      trueValues: undefined,
      falseValues: undefined,
      expected: undefined,
      expectedError: new FilterException('Value failed filtering, allowNull is set to false'),
    }],
    [{
      value: undefined,
      allowNull: undefined,
      trueValues: undefined,
      falseValues: undefined,
      expected: undefined,
      expectedError: new FilterException('Value failed filtering, allowNull is set to false'),
    }],
    [{
      value: {},
      allowNull: undefined,
      trueValues: undefined,
      falseValues: undefined,
      expected: undefined,
      expectedError: new FilterException('{} value is not a string'),
    }],
    [{
      value: 'y',
      allowNull: undefined,
      trueValues: ['true', 'yes'],
      falseValues: ['false', 'no'],
      expected: undefined,
      expectedError: new FilterException('"y" is not "true" or "yes" or "false" or "no" disregarding case and whitespace'),
    }],
  ])('BooleanFilter.filter(value, allowNull, trueValues, falseValues) | %j', (example) => {
    const {
      value,
      allowNull,
      trueValues,
      falseValues,
      expected,
      expectedError,
    } = example;
    let error: Error;
    let result: boolean;
    try {
      result = BooleanFilter.filter(value, allowNull, trueValues, falseValues);
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
      value: true,
      trueValue: undefined,
      falseValue: undefined,
      expected: 'true',
      expectedError: undefined,
    }],
    [{
      value: false,
      trueValue: undefined,
      falseValue: undefined,
      expected: 'false',
      expectedError: undefined,
    }],
    [{
      value: true,
      trueValue: 'Y',
      falseValue: undefined,
      expected: 'Y',
      expectedError: undefined,
    }],
    [{
      value: false,
      trueValue: undefined,
      falseValue: 'N',
      expected: 'N',
      expectedError: undefined,
    }],
    [{
      value: true,
      trueValue: { some: ['object'] },
      falseValue: undefined,
      expected: { some: ['object'] },
      expectedError: undefined,
    }],
    [{
      value: false,
      trueValue: undefined,
      falseValue: { some: ['object'] },
      expected: { some: ['object'] },
      expectedError: undefined,
    }],
    [{
      value: {},
      trueValue: undefined,
      falseValue: undefined,
      expected: undefined,
      expectedError: new FilterException('Value {} is not a boolean'),
    }],
  ])('BooleanFilter.convert(value, trueValue, falseValue) | %j', (example) => {
    const {
      value,
      trueValue,
      falseValue,
      expected,
      expectedError,
    } = example;
    let error: Error;
    let result: unknown;
    try {
      result = BooleanFilter.convert(value, trueValue, falseValue);
    } catch (thrownError) {
      error = thrownError;
    }
    expect({ error, result }).toStrictEqual({
      error: expectedError,
      result: expected,
    });
  });
});
