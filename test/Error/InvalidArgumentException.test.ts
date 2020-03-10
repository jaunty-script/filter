import InvalidArgumentException from 'Error/InvalidArgumentException';

describe('InvalidArgumentException', () => {
  test('constructor(message)', () => {
    const message = 'test';
    const exception = new InvalidArgumentException(message);
    expect(exception.message).toStrictEqual(message);
    expect(exception.name).toStrictEqual('InvalidArgumentException');
  });
});
