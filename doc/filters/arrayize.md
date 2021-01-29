# arrayize

This filter is used to convert a value into an array if it is not one already.

## Arguments

argument | type      | default | description
-------- | --------- | ------- | --------------------
value    | `unknown` |         | The value to filter.

## Filtered value

If the value was an array, the original array is returned.

If the value was null, an empty array is returned.

If the value was any other value, an array containing the original value as its only element is returned.

## Error conditions

error   | message
------- | -------
&mdash; | &mdash;

## Examples

Below are a few example use cases and the expected results.

### Array value

```js
const filterer = new Filterer({
  field: [['arrayize']],
});
const result = filterer.execute({
  field: ['value'],
});

expect(result.filteredValue).toStrictEqual({
  field: ['value'],
});
```

### Null value

```js
const filterer = new Filterer({
  field: [['arrayize']],
});
const result = filterer.execute({
  field: null,
});

expect(result.filteredValue).toStrictEqual({
  field: [],
});
```

### Other value

```js
const filterer = new Filterer({
  field: [['arrayize']],
});
const result = filterer.execute({
  field: 'value',
});

expect(result.filteredValue).toStrictEqual({
  field: ['value'],
});
```

## Additional Information

File last updated: 2021-01-29T03:08:57.947Z
