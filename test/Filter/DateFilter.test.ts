import DateFilter from 'Filter/DateFilter';
import FilterException from 'Error/FilterException';
import InvalidArgumentException from 'Error/InvalidArgumentException';

describe('DateFilter', () => {
  test.each([
    [{
      value: new Date('2010-01-01'),
      allowNull: undefined,
      expected: new Date('2010-01-01'),
      expectedError: undefined,
    }],
    [{
      value: '2020-02-03',
      allowNull: undefined,
      expected: new Date('2020-02-03'),
      expectedError: undefined,
    }],
    [{
      value: 1,
      allowNull: undefined,
      expected: new Date(1),
      expectedError: undefined,
    }],
    [{
      value: -10000,
      allowNull: undefined,
      expected: new Date(-10000),
      expectedError: undefined,
    }],
    [{
      value: '-22222.02',
      allowNull: undefined,
      expected: new Date(-22222),
      expectedError: undefined,
    }],
    [{
      value: undefined,
      allowNull: true,
      expected: null,
      expectedError: undefined,
    }],
    [{
      value: null,
      allowNull: true,
      expected: null,
      expectedError: undefined,
    }],
    [{
      value: null,
      allowNull: {},
      expected: undefined,
      expectedError: new InvalidArgumentException('allowNull {} is not a boolean'),
    }],
    [{
      value: null,
      allowNull: undefined,
      expected: undefined,
      expectedError: new FilterException('Value failed filtering, allowNull is set to false'),
    }],
    [{
      value: null,
      allowNull: false,
      expected: undefined,
      expectedError: new FilterException('Value failed filtering, allowNull is set to false'),
    }],
    [{
      value: '  ',
      allowNull: undefined,
      expected: undefined,
      expectedError: new FilterException('"  " is not a non-empty string'),
    }],
    [{
      value: '',
      allowNull: undefined,
      expected: undefined,
      expectedError: new FilterException('"" is not a non-empty string'),
    }],
  ])('DateFilter.filter(value, allowNull) | %j', (example) => {
    const {
      value,
      allowNull,
      expected,
      expectedError,
    } = example;
    let error: Error;
    let result: Date;
    try {
      result = DateFilter.filter(value, allowNull);
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
      date: new Date('1900-12-25'),
      format: undefined,
      expected: (new Date('1900-12-25')).toLocaleDateString(),
      expectedError: undefined,
    }],
    [{
      date: new Date('2020-10-20'),
      format: null,
      expected: (new Date('2020-10-20')).toLocaleDateString(),
      expectedError: undefined,
    }],
    [{
      date: new Date('1999-09-09'),
      format: 'GMT',
      expected: (new Date('1999-09-09')).toLocaleDateString('GMT'),
      expectedError: undefined,
    }],
    [{
      date: new Date(1),
      format: {},
      expected: undefined,
      expectedError: new InvalidArgumentException('format {} is not a string'),
    }],
    [{
      date: undefined,
      format: undefined,
      expected: undefined,
      expectedError: new FilterException('date undefined is not a Date object'),
    }],
    [{
      date: null,
      format: undefined,
      expected: undefined,
      expectedError: new FilterException('date null is not a Date object'),
    }],
  ])('DateFilter.format(date, format) | %j', (example) => {
    const {
      date,
      format,
      expected,
      expectedError,
    } = example;
    let error: Error;
    let result: string;
    try {
      result = DateFilter.format(date, <string>format);
    } catch (thrownError) {
      error = thrownError;
    }
    expect({ error, result }).toStrictEqual({
      error: expectedError,
      result: expected,
    });
  });
});
