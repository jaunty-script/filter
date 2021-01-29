# int

This filter is used to ensure that a value is an integer and that it is within a minimum and maximum value.

## Arguments

argument   | type      | default                   | description
---------- | --------- | ------------------------- | --------------------------------------------------------
value      | `unknown` |                           | The value to filter.
allowNull  | `boolean` | `false`                   | Determines if `null` values are allowed to pass through.
minValue   | `number`  | `Number.MIN_SAFE_INTEGER` | The minimum value that is allowed to pass through.
maxValue   | `number`  | `Number.MAX_SAFE_INTEGER` | The maximum value that is allowed to pass through.

## Filtered value

The original value, cast to an integer, or `null` if the value was `null` and `allowNull` was set to `true`.

## Error conditions

error                    | message
------------------------ | ---------------------------------------------------
InvalidArgumentException | `allowNull {allowNull} is not a boolean`
InvalidArgumentException | `minValue {minValue} is not a number`
InvalidArgumentException | `maxValue {maxValue} is not a number`
FilterException          | `Value failed filtering, allowNull is set to false`
FilterException          | `{value} value is not a number`
FilterException          | `{value} value is not a string`
FilterException          | `{value} is less than {minValue}`
FilterException          | `{value} is greater than {maxValue}`

## Additional Information

File last updated: 2021-01-29T03:08:57.947Z
