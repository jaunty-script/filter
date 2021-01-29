# ofObjects

This filter is used to ensure that an array of objects match a particular specification.

## Arguments

argument   | type       | default   | description
---------- | ---------- | --------- | ------------------------------------------
value      | `Object[]` |           | The value to filter.

## Filtered value

A copy of the original objects, modified according to the specification.

## Error conditions

error           | message
--------------- | -------------------------------------------------------------------
Error           | `filters for field "{field}" was not an array or object`
Error           | `filters for field "{field}" was not an array`
Error           | `filter for field "{field}" was not an array`
Error           | `filter {filter} for field "{field}" is not a function`
Error           | `required for field "{field}" is not a boolean`
Error           | `customError for field "{field}" was not a non-empty string`
FilterException | `Value at position "{index}" is not an object`
FilterException | `Value at position "{index}" failed filtering, message "{message}"`

## Additional Information

File last updated: 2021-01-29T03:08:57.947Z
