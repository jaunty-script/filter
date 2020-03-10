import FiltererResponse from 'Filterer/FiltererResponse';

describe('FiltererResponse', () => {
  test.each([
    [{
      filteredValue: '',
      errors: ['error one', 'error two'],
      unknowns: { unknownOne: 'one', unknownTwo: 'two' },
      expectedErrorMessage: 'error one\nerror two',
      expectedSuccess: false,
    }],
    [{
      filteredValue: 'val',
      errors: [],
      unknowns: { unknownOne: 'one', unknownTwo: 'two' },
      expectedErrorMessage: null,
      expectedSuccess: true,
    }],
    [{
      filteredValue: 'val',
      errors: [],
      unknowns: {},
      expectedErrorMessage: null,
      expectedSuccess: true,
    }],
  ])('constructor(filteredValue, errors, unknowns) | %j', (example) => {
    const {
      filteredValue,
      errors,
      unknowns,
      expectedErrorMessage,
      expectedSuccess,
    } = example;
    const response = new FiltererResponse(filteredValue, errors, unknowns);

    expect(response.filteredValue).toStrictEqual(filteredValue);
    expect(response.errors).toStrictEqual(errors);
    expect(response.unknowns).toStrictEqual(unknowns);
    expect(response.errorMessage).toStrictEqual(expectedErrorMessage);
    expect(response.success).toStrictEqual(expectedSuccess);
  });
});
