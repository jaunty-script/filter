# split

This filter is used to split a string into an array of strings.

## Arguments

argument       | type      | default | description
-------------- | --------- | ------- | ------------------------------------------
value          | `unknown` |         | The value to filter.
delimiter      | `string`  | `','`   | The delimiter to split on.

## Filtered value

An array of strings containing all parts of the original value, split at the delimiter character.
The delimiter is not included in any of the filtered strings.

## Error conditions

error                    | message
------------------------ | ------------------------------------------------
InvalidArgumentException | `delimiter {delimiter} is not a string`
InvalidArgumentException | `delimiter {delimiter} is not a non-empty string`
FilterException          | `Value {value} is not a string`
FilterException          | `Value {value} cannot be cast to a string`

## Examples

Below are a few example use cases and the expected results.

### Split with the default character

```js
const filterer = new Filterer({
  field: [['split']],
});
const result = filterer.execute({
  field: 'a,b,c',
});

expect(result.filteredValue).toStrictEqual({
  field: ['a', 'b', 'c'],
});
```

### Split with a defined delimiter

```js
const filterer = new Filterer({
  field: [['split', '-|-']],
});
const result = filterer.execute({
  field: 'a-|-b-|-c',
});

expect(result.filteredValue).toStrictEqual({
  field: ['a', 'b', 'c'],
});
```

## Additional Information

File last updated: 2021-01-29T03:08:57.947Z
