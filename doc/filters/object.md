# object

This filter is used to ensure that an object matches a particular specification.

## Arguments

argument      | type     | default   | description
------------- | -------- | --------- | ---------------------------------------
value         | `Object` |           | The value to filter.
specification | `Object` |           | The filter specification to be applied.

## Filtered value

A copy of the original object, modified according to the specification.

## Error conditions

error           | message
--------------- | ------------------------------------------------
Error           | `filters for field "{field}" was not an array or object`
Error           | `filters for field "{field}" was not an array`
Error           | `filter for field "{field}" was not an array`
Error           | `filter {filter} for field "{field}" is not a function`
Error           | `required for field "{field}" is not a boolean`
Error           | `customError for field "{field}" was not a non-empty string`
FilterException | `Field "{field}" with value {value} is unknown`
FilterException | `Field "{field}" cannot be given if field "{conflictsWith}" is present`
FilterException | `Field "{field}" with value {value} failed filtering, message "{message}"`
FilterException | `Field "{field}" was required and not present`

## Additional Information

File last updated: 2021-01-29T03:08:57.947Z
