import Filterer from 'index';
import FiltererResponse from 'Filterer/FiltererResponse';

describe('Filterer', () => {
  test('Filterer.DEFAULT_FILTER_ALIASES', () => {
    const aliases = Filterer.DEFAULT_FILTER_ALIASES;
    expect(aliases).toBeInstanceOf(Object);
    expect(Object.keys(aliases)).toStrictEqual([
      'array',
      'arrayize',
      'bool',
      'boolConvert',
      'compressString',
      'concat',
      'date',
      'dateFormat',
      'flatten',
      'float',
      'in',
      'int',
      'json',
      'object',
      'ofObjects',
      'ofScalars',
      'redact',
      'split',
      'string',
      'stripTags',
      'translate',
      'uint',
      'validateJSON',
    ]);
  });

  test('Filterer.DEFAULT_OPTIONS', () => {
    const aliases = Filterer.DEFAULT_OPTIONS;
    expect(aliases).toStrictEqual({
      allowUnknowns: false,
      defaultRequired: false,
      filterAliases: Filterer.DEFAULT_FILTER_ALIASES,
    });
  });

  test.each([
    [{
      specification: {},
      options: undefined,
      value: {},
      expectedValue: {},
      expectedErrors: [],
      expectedUnknowns: {},
    }],
    [{
      specification: {
        field: [['string']],
      },
      options: undefined,
      value: {
        field: 100,
      },
      expectedValue: {
        field: '100',
      },
      expectedErrors: [],
      expectedUnknowns: {},
    }],
    [{
      specification: {
        field: [[() => 'foo']],
      },
      options: undefined,
      value: {
        field: 100,
      },
      expectedValue: {
        field: 'foo',
      },
      expectedErrors: [],
      expectedUnknowns: {},
    }],
    [{
      specification: {
        field: {
          filters: [['string']],
          required: true,
        },
      },
      options: {},
      value: {},
      expectedValue: {},
      expectedErrors: ['Field "field" was required and not present'],
      expectedUnknowns: {},
    }],
    [{
      specification: {},
      options: {},
      value: {
        field: 'value',
      },
      expectedValue: {},
      expectedErrors: ['Field "field" with value "value" is unknown'],
      expectedUnknowns: {
        field: 'value',
      },
    }],
    [{
      specification: {
        field: {
          conflictsWith: 'otherField',
        },
        otherField: {},
      },
      options: {},
      value: {
        field: 'value',
      },
      expectedValue: {
        field: 'value',
      },
      expectedErrors: [],
      expectedUnknowns: {},
    }],
    [{
      specification: {
        field: {
          conflictsWith: 'otherField',
        },
        otherField: {},
      },
      options: {},
      value: {
        field: 'value',
        otherField: 'otherValue',
      },
      expectedValue: {
        field: 'value',
        otherField: 'otherValue',
      },
      expectedErrors: ['Field "field" cannot be given if field "otherField" is present'],
      expectedUnknowns: {},
    }],
    [{
      specification: {
        field: {
          conflictsWith: ['otherField', 'extraField'],
        },
        otherField: {},
        extraField: {},
      },
      options: {},
      value: {
        field: 'value',
        otherField: 'otherValue',
        extraField: 'extraValue',
      },
      expectedValue: {
        field: 'value',
        otherField: 'otherValue',
        extraField: 'extraValue',
      },
      expectedErrors: [
        'Field "field" cannot be given if field "otherField" is present',
        'Field "field" cannot be given if field "extraField" is present',
      ],
      expectedUnknowns: {},
    }],
    [{
      specification: {
        field: {},
      },
      options: undefined,
      value: {
        field: '',
      },
      expectedValue: {
        field: '',
      },
      expectedErrors: [],
      expectedUnknowns: {},
    }],
    [{
      specification: {
        field: {
          customError: 'This is a test of the custom error',
          filters: [['string']],
        },
      },
      options: {},
      value: {
        field: {},
      },
      expectedValue: {
        field: {},
      },
      expectedErrors: ['This is a test of the custom error'],
      expectedUnknowns: {},
    }],
    [{
      specification: {
        field: {
          filters: [['string']],
          defaultValue: 'value',
        },
      },
      options: {},
      value: {},
      expectedValue: {
        field: 'value',
      },
      expectedErrors: [],
      expectedUnknowns: {},
    }],
    [{
      specification: {
        field: [
          [
            'object',
            { subField: [['string']] },
          ],
        ],
      },
      options: {},
      value: {
        field: {
          subField: 'value',
        },
      },
      expectedValue: {
        field: {
          subField: 'value',
        },
      },
      expectedErrors: [],
      expectedUnknowns: {},
    }],
    [{
      specification: {
        field: [
          [
            'object',
            { subField: [['string']] },
          ],
        ],
      },
      options: {},
      value: {
        field: {
          subField: {},
        },
      },
      expectedValue: {
        field: {
          subField: {},
        },
      },
      expectedErrors: [
        'Field "field" with value {"subField":{}} failed filtering, message "Field "subField" with value {} failed filtering, message "Value {} cannot be cast to a string""',
      ],
      expectedUnknowns: {},
    }],
    [{
      specification: {
        field: [
          ['array'],
          [
            'ofObjects',
            { value: [['string']] },
          ],
        ],
      },
      options: {},
      value: {
        field: [
          { value: 'one' },
          { value: 'two' },
          { value: 'three' },
        ],
      },
      expectedValue: {
        field: [
          { value: 'one' },
          { value: 'two' },
          { value: 'three' },
        ],
      },
      expectedErrors: [],
      expectedUnknowns: {},
    }],
    [{
      specification: {
        field: [
          ['array'],
          [
            'ofObjects',
            { value: [['string']] },
          ],
        ],
      },
      options: {},
      value: {
        field: [
          { value: { one: 'value' } },
          { value: { two: 'value' } },
        ],
      },
      expectedValue: {
        field: [
          { value: { one: 'value' } },
          { value: { two: 'value' } },
        ],
      },
      expectedErrors: [
        'Field "field" with value [{"value":{"one":"value"}},{"value":{"two":"value"}}] failed filtering, message "Value at position "0" failed filtering, message "Field "value" with value {"one":"value"} failed filtering, message "Value {"one":"value"} cannot be cast to a string""\nValue at position "1" failed filtering, message "Field "value" with value {"two":"value"} failed filtering, message "Value {"two":"value"} cannot be cast to a string"""',
      ],
      expectedUnknowns: {},
    }],
    [{
      specification: {
        field: [
          ['array'],
          [
            'ofObjects',
            { value: [['string']] },
          ],
        ],
      },
      options: {},
      value: {
        field: [
          { value: 'one' },
          [],
          [],
        ],
      },
      expectedValue: {
        field: [
          { value: 'one' },
          [],
          [],
        ],
      },
      expectedErrors: [
        'Field "field" with value [{"value":"one"},[],[]] failed filtering, message "Value at position "1" is not an object\nValue at position "2" is not an object"',
      ],
      expectedUnknowns: {},
    }],
    [{
      specification: {
        field: [
          ['array'],
          [
            'ofScalars',
            [['string']],
          ],
        ],
      },
      options: {},
      value: {
        field: [
          100,
          200,
          300,
        ],
      },
      expectedValue: {
        field: [
          '100',
          '200',
          '300',
        ],
      },
      expectedErrors: [],
      expectedUnknowns: {},
    }],
    [{
      specification: {
        field: [
          ['array'],
          [
            'ofScalars',
            [['string']],
          ],
        ],
      },
      options: {},
      value: {
        field: [
          {},
          {},
        ],
      },
      expectedValue: {
        field: [
          {},
          {},
        ],
      },
      expectedErrors: [
        'Field "field" with value [{},{}] failed filtering, message "Field "0" with value {} failed filtering, message "Value {} cannot be cast to a string"\nField "1" with value {} failed filtering, message "Value {} cannot be cast to a string""',
      ],
      expectedUnknowns: {},
    }],
    [{
      specification: {},
      options: {
        allowUnknowns: true,
      },
      value: { unknownField: 'value' },
      expectedValue: {},
      expectedErrors: [],
      expectedUnknowns: { unknownField: 'value' },
    }],
    [{
      specification: {
        field: [['string']],
      },
      options: {
        defaultRequired: true,
      },
      value: {},
      expectedValue: {},
      expectedErrors: ['Field "field" was required and not present'],
      expectedUnknowns: {},
    }],
    [{
      specification: {
        field: {
          filters: [['string']],
        },
      },
      options: {
        defaultRequired: true,
      },
      value: {},
      expectedValue: {},
      expectedErrors: ['Field "field" was required and not present'],
      expectedUnknowns: {},
    }],
  ])('execute(input) | %j', (example) => {
    const {
      specification,
      options,
      value,
      expectedValue,
      expectedErrors,
      expectedUnknowns,
    } = example;
    const expected = new FiltererResponse(expectedValue, expectedErrors, expectedUnknowns);
    const filterer = new Filterer(specification, options);
    const result = filterer.execute(value);
    expect(result).toStrictEqual(expected);
  });

  test.each([
    [{
      specification: {
        field: 'string',
      },
      options: undefined,
      value: {},
      expected: new Error('filters for field "field" was not an array or object'),
    }],
    [{
      specification: {
        field: ['string'],
      },
      options: undefined,
      value: {
        field: 'value',
      },
      expected: new Error('filter for field "field" was not an array'),
    }],
    [{
      specification: {
        field: {
          filters: {},
        },
      },
      options: undefined,
      value: {
        field: 'value',
      },
      expected: new Error('filters for field "field" was not an array'),
    }],
    [{
      specification: {
        field: [[{}]],
      },
      options: undefined,
      value: {
        field: 'value',
      },
      expected: new Error('filter {} for field "field" is not a function'),
    }],
    [{
      specification: {
        field: {
          required: {},
        },
      },
      options: undefined,
      value: {},
      expected: new Error('required for field "field" is not a boolean'),
    }],
    [{
      specification: {
        field: {
          customError: {},
          filters: [['string']],
        },
      },
      options: undefined,
      value: {
        field: {},
      },
      expected: new Error('customError for field "field" was not a non-empty string'),
    }],
  ])('execute(input) throws error | %j', (example) => {
    const {
      specification,
      options,
      value,
      expected,
    } = example;
    const filterer = new Filterer(specification, options);
    let result: FiltererResponse;
    let error: Error;
    try {
      result = filterer.execute(value);
    } catch (thrownError) {
      error = thrownError;
    }
    expect(error).toStrictEqual(expected);
    expect(result).toBeUndefined();
  });

  test.each([
    [{
      specification: {},
      options: {},
      expected: Filterer.DEFAULT_OPTIONS,
    }],
    [{
      specification: {},
      options: {
        allowUnknowns: true,
      },
      expected: {
        ...Filterer.DEFAULT_OPTIONS,
        allowUnknowns: true,
      },
    }],
    [{
      specification: {},
      options: {
        defaultRequired: true,
      },
      expected: {
        ...Filterer.DEFAULT_OPTIONS,
        defaultRequired: true,
      },
    }],
    [{
      specification: {},
      options: {
        filterAliases: {},
      },
      expected: {
        ...Filterer.DEFAULT_OPTIONS,
        filterAliases: {},
      },
    }],
    [{
      specification: {},
      options: {
        allowUnknowns: true,
        defaultRequired: true,
        filterAliases: {},
      },
      expected: {
        allowUnknowns: true,
        defaultRequired: true,
        filterAliases: {},
      },
    }],
  ])('getOptions() | %j', (example) => {
    const {
      specification,
      options,
      expected,
    } = example;
    const filterer = new Filterer(specification, options);
    expect(filterer.getOptions()).toStrictEqual(expected);
  });

  test.each([
    [{
      specification: {},
    }],
    [{
      specification: { foo: ['bar'] },
    }],
  ])('getSpecification() | %j', (example) => {
    const {
      specification,
    } = example;
    const filterer = new Filterer(specification);
    expect(filterer.getSpecification()).toStrictEqual(specification);
  });

  test.each([
    [{
      specification: {},
      options: {},
      expected: Filterer.DEFAULT_OPTIONS,
    }],
    [{
      specification: {},
      options: {
        allowUnknowns: true,
      },
      expected: {
        ...Filterer.DEFAULT_OPTIONS,
        allowUnknowns: true,
      },
    }],
    [{
      specification: {},
      options: {
        defaultRequired: true,
      },
      expected: {
        ...Filterer.DEFAULT_OPTIONS,
        defaultRequired: true,
      },
    }],
    [{
      specification: {},
      options: {
        filterAliases: {},
      },
      expected: {
        ...Filterer.DEFAULT_OPTIONS,
        filterAliases: {},
      },
    }],
    [{
      specification: {},
      options: {
        allowUnknowns: true,
        defaultRequired: true,
        filterAliases: {},
      },
      expected: {
        allowUnknowns: true,
        defaultRequired: true,
        filterAliases: {},
      },
    }],
  ])('withOptions(options) | %j', (example) => {
    const {
      options,
      expected,
    } = example;
    const filterer = new Filterer({ unique: Math.random() });
    const newFilterer = filterer.withOptions(options);
    expect(newFilterer).not.toBe(filterer);
    expect(newFilterer.getSpecification()).toStrictEqual(filterer.getSpecification());
    expect(newFilterer.getOptions()).toStrictEqual(expected);
  });

  test.each([
    [{
      specification: {},
    }],
    [{
      specification: { foo: ['bar'] },
    }],
  ])('withSpecification(specification) | %j', (example) => {
    const {
      specification,
    } = example;
    const filterer = new Filterer({ unique: Math.random() });
    const newFilterer = filterer.withSpecification(specification);
    expect(newFilterer).not.toBe(filterer);
    expect(newFilterer.getSpecification()).toStrictEqual(specification);
    expect(newFilterer.getOptions()).toStrictEqual(filterer.getOptions());
  });
});
