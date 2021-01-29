# redact

This filter is used to remove words from within a string or to replace the words with replacement characters.

## Arguments

argument    | type                | default | description
----------- | ------------------- | ------- | -----------------------------------------------------------------------
value       | `unknown`           |         | The value to filter.
words       | `string[]|Function` |         | The words which will be replaced or a function which returns the words.
replacement | `string`            | `''`    | The character used to replace the words.

## Filtered value

The original value with all of the restricted words substituted with replacement characters.

## Error conditions

error                    | message
------------------------ | ------------------------------------------------
InvalidArgumentException | `replacement {replacement} is not a string`
InvalidArgumentException | `words was not an array or a function that returns an array`
FilterException          | `Value {value} is not a string`
FilterException          | `Value {value} cannot be cast to a string`

## Examples

Below are a few example use cases and the expected results.

### No replacement character

```js
const filterer = new Filterer({
  field: [['redact', ['good', 'wholesome']]],
});
const result = filterer.execute({
  field: 'this is a good, wholesome sentence',
});

expect(result.filteredValue).toStrictEqual({
  field: 'this is a ,  sentence',
});
```

### Replacement character

```js
const filterer = new Filterer({
  field: [['redact', ['good', 'wholesome'], '*']],
});
const result = filterer.execute({
  field: 'this is a good, wholesome sentence',
});

expect(result.filteredValue).toStrictEqual({
  field: 'this is a ****, ********* sentence',
});
```

### Function that provides words

```js
const provideWords = () => ['sentence'];

const filterer = new Filterer({
  field: [['redact', provideWords]],
});
const result = filterer.execute({
  field: 'this is a good, wholesome sentence',
});

expect(result.filteredValue).toStrictEqual({
  field: 'this is a good, wholesome ',
});
```

## Additional Information

File last updated: 2021-01-29T03:08:57.947Z
