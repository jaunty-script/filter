# in

This filter is used to ensure that a value is in a given array.

## Arguments

argument   | type      | default   | description
---------- | --------- | --------- | -----------------------------------------------------
value      | `unknown` |           | The value to filter.
haystack   | `any[]`   |           | The values that are allowed to pass through.
strict     | `boolean` | `true`    | Determines if strict equality (`===`) should be used.

## Filtered value

The original, unmodified value.

## Error conditions

error                    | message
------------------------ | ------------------------------------------------
InvalidArgumentException | `haystack {haystack} is not an array`
InvalidArgumentException | `strict {strict} is not a boolean`
FilterException          | `Value {value} is not in array {haystack}`

## Additional Information

File last updated: 2021-01-29T03:08:57.947Z
