# date

This filter is used to convert a value into a `Date` object.

## Arguments

argument   | type      | default   | description
---------- | --------- | --------- | --------------------------------------------------------
value      | `unknown` |           | The value to filter.
allowNull  | `boolean` | `false`   | Determines if `null` values are allowed to pass through.

## Filtered value

A `Date` object that is equivalent to the provided value or `null` if the value was `null` and `allowNull` was set to `true`.

## Error conditions

error                    | message
------------------------ | ---------------------------------------------------
InvalidArgumentException | `allowNull {allowNull} is not a boolean`
FilterException          | `Value failed filtering, allowNull is set to false`
FilterException          | `{value} is not a non-empty string`

## Additional Information

File last updated: 2021-01-29T03:08:57.947Z
