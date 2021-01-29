# boolConvert

This filter is used to convert a boolean value into other specified values.
A common use for this would be to convert `true` to `Yes` and `false` to `No`.

## Arguments

argument   | type      | default   | description
---------- | --------- | --------- | ------------------------------------------
value      | `unknown` |           | The value to filter.
trueValue  | `unknown` | `'true'`  | The value to return when the value is true.
falseValue | `unknown` | `'false'` | The value to return when the value is false.

## Filtered value

The `trueValue` argument when `value` is `true`, otherwise the `falseValue`.

## Error conditions

error           | message
--------------- | ------------------------------------------------
FilterException | `Value {value} is not a boolean`

## Additional Information

File last updated: 2021-01-29T03:08:57.947Z
