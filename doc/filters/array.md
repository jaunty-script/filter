# array

This filter is used to ensure that a value is an array and that it has a minimum and maximum number of items.

## Arguments

argument | type      | default    | description
-------- | --------- | ---------- | ------------------------------------------
value    | `unknown` |            | The value to filter.
minCount | `number`  | `1`        | The minimum number of items in the array.
maxCount | `number`  | `Infinity` | The maxmimum number of items in the array.

## Filtered value

The original, unmodified array.

## Error conditions

error                    | message
------------------------ | ------------------------------------------------
InvalidArgumentException | `minCount {minCount} is not a number`
InvalidArgumentException | `maxCount {maxCount} is not a number`
FilterException          | `Value {value} is not an array`
FilterException          | `value count of {count} is less than {minCount}`
FilterException          | `value count of {count} is less than {maxCount}`

## Additional Information

File last updated: 2021-01-29T03:08:57.947Z
