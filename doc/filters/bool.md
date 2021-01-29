# bool

This filter is used to convert a value into a boolean.

## Arguments

argument    | type       | default     | description
----------- | ---------- | ----------- | --------------------------------------------------------
value       | `unknown`  |             | The value to filter.
allowNull   | `boolean`  | `false`     | Determines if `null` values are allowed to pass through.
trueValues  | `string[]` | `['true']`  | Strings that will filter to true.
falseValues | `string[]` | `['false']` | Strings that will filter to false.

## Filtered value

If the value was a boolean, the original value is returned.

If the value was a string and was in the `trueValues` array, `true` is returned.

If the value was a string and was in the `falseValues` array, `false` is returned.

## Error conditions

error                    | message
------------------------ | -------------------------------------------
InvalidArgumentException | `allowNull {allowNull} is not a boolean`
InvalidArgumentException | `trueValues {trueValues} is not an array`
InvalidArgumentException | `falseValues {falseValues} is not an array`
FilterException          | `{value} value is not a string`

## Additional Information

File last updated: 2021-01-29T03:08:57.947Z
