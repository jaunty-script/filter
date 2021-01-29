# float

This filter is used to ensure that a value is a float value and that it is within a minimum and maximum value.

## Arguments

argument  | type      | default     | description
--------- | --------- | ----------- | --------------------------------------------------------
value     | `unknown` |             | The value to filter.
allowNull | `boolean` | `false`     | Determines if `null` values are allowed to pass through.
minValue  | `number`  | `-Infinity` | The minimum value that is allowed to pass through.
maxValue  | `number`  | `Infinity`  | The maximum value that is allowed to pass through.

## Filtered value

The original value, cast to a float, or `null` if the value was `null` and `allowNull` was set to `true`.

## Error conditions

error                    | message
------------------------ | ----------------------------------------
InvalidArgumentException | `allowNull {allowNull} is not a boolean`
InvalidArgumentException | `minValue {minValue} is not a number`
InvalidArgumentException | `maxValue {maxValue} is not a number`
FilterException          | `{value} value is not a number`
FilterException          | `{value} is not a finite number`
FilterException          | `{value} is less than {minValue}`
FilterException          | `{value} is greater than {maxValue}`

## Additional Information

File last updated: 2021-01-29T03:08:57.947Z
