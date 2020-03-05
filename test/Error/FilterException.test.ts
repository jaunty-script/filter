import FilterException from "Error/FilterException";

describe('FilterException', () => {
  test('constructor(message)', () => {
    const message = 'test';
    const exception = new FilterException(message);
    expect(exception.message).toStrictEqual(message);
    expect(exception.name).toStrictEqual('FilterException');
  });
});
