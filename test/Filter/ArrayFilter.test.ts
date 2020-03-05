import ArrayFilter from 'Filter/ArrayFilter';
import FilterException from 'Error/FilterException';
import InvalidArgumentException from 'Error/InvalidArgumentException';

describe('ArrayFilter', () => {
  test.each([
    [{
      value: [1],
      minCount: undefined,
      maxCount: undefined,
      expected: [1],
      expectedError: undefined,
    }],
    [{
      value: [1],
      minCount: undefined,
      maxCount: undefined,
      expected: [1],
      expectedError: undefined,
    }],
    [{
      value: [],
      minCount: 0,
      maxCount: undefined,
      expected: [],
      expectedError: undefined,
    }],
    [{
      value: [],
      minCount: [],
      maxCount: undefined,
      expected: undefined,
      expectedError: new InvalidArgumentException('minCount [] is not a number'),
    }],
    [{
      value: [],
      minCount: undefined,
      maxCount: [],
      expected: undefined,
      expectedError: new InvalidArgumentException('maxCount [] is not a number'),
    }],
    [{
      value: undefined,
      minCount: undefined,
      maxCount: undefined,
      expected: undefined,
      expectedError: new FilterException('Value undefined is not an array'),
    }],
    [{
      value: null,
      minCount: undefined,
      maxCount: undefined,
      expected: undefined,
      expectedError: new FilterException('Value null is not an array'),
    }],
    [{
      value: [],
      minCount: undefined,
      maxCount: undefined,
      expected: undefined,
      expectedError: new FilterException('value count of 0 is less than 1'),
    }],
    [{
      value: [1],
      minCount: 2,
      maxCount: undefined,
      expected: undefined,
      expectedError: new FilterException('value count of 1 is less than 2'),
    }],
    [{
      value: [1, 2],
      minCount: 1,
      maxCount: 1,
      expected: undefined,
      expectedError: new FilterException('value count of 2 is greater than 1'),
    }],
  ])('ArrayFilter.filter(value, minCount, maxCount) | %j', (example) => {
    const {
      value,
      minCount,
      maxCount,
      expected,
      expectedError,
    } = example;
    let result: any[];
    let error: Error;
    try {
      result = ArrayFilter.filter(value, minCount, maxCount);
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
      value: '1',
      haystack: ['3', '1', '2'],
      strict: undefined,
      expected: '1',
      expectedError: undefined,
    }],
    [{
      value: '1',
      haystack: ['3', '1', '2'],
      strict: true,
      expected: '1',
      expectedError: undefined,
    }],
    [{
      value: 1,
      haystack: ['3', '1', '2'],
      strict: false,
      expected: 1,
      expectedError: undefined,
    }],
    [{
      value: '',
      haystack: {},
      strict: undefined,
      expected: undefined,
      expectedError: new InvalidArgumentException('haystack {} is not an array'),
    }],
    [{
      value: '',
      haystack: [],
      strict: {},
      expected: undefined,
      expectedError: new InvalidArgumentException('strict {} is not a boolean'),
    }],
    [{
      value: '',
      haystack: [],
      strict: undefined,
      expected: undefined,
      expectedError: new FilterException('Value "" is not in array []'),
    }],
    [{
      value: '1',
      haystack: [1, 2, 3],
      strict: true,
      expected: undefined,
      expectedError: new FilterException('Value "1" is not in array [1,2,3]'),
    }],
    [{
      value: '0',
      haystack: [1, 2, 3],
      strict: false,
      expected: undefined,
      expectedError: new FilterException('Value "0" is not in array [1,2,3]'),
    }],
  ])('ArrayFilter.in(value, haystack, strict) | %j', (example) => {
    const {
      value,
      haystack,
      strict,
      expected,
      expectedError,
    } = example;
    let result: any[];
    let error: Error;
    try {
      result = ArrayFilter.in(value, haystack, strict);
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
      value: [[[[[[[[1]]]]]]]],
      expected: [1],
      expectedError: undefined,
    }],
    [{
      value: [1],
      expected: [1],
      expectedError: undefined,
    }],
    [{
      value: {},
      expected: undefined,
      expectedError: new FilterException('{} is not an array'),
    }],
  ])('ArrayFilter.flatten(value) | %j', (example) => {
    const {
      value,
      expected,
      expectedError,
    } = example;
    let result: any[];
    let error: Error;
    try {
      result = ArrayFilter.flatten(value);
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
      value: '1',
      expected: ['1'],
    }],
    [{
      value: ['1'],
      expected: ['1'],
    }],
    [{
      value: undefined,
      expected: [],
    }],
    [{
      value: null,
      expected: [],
    }],
  ])('ArrayFilter.arrayize(value) | %j', (example) => {
    const {
      value,
      expected,
    } = example;
    const result = ArrayFilter.arrayize(value);
    expect(result).toStrictEqual(expected);
  });
});
