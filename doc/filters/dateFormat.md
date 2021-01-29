# dateFormat

This filter is used to format a `Date` object to a locale date string.
This is equivalent to calling the object's `toLocaleDateString` function.

## Arguments

argument   | type          | default   | description
---------- | ------------- | --------- | --------------------------------
value      | `unknown`     |           | The value to filter.
format     | `string|null` | `null`    | The locale format to convert to.

## Filtered value

A string representation of the date in the provided format.
If `null` is given for the `format`, the format will be determined by the `Date` object.

## Error conditions

error                    | message
------------------------ | ------------------------------------------------
InvalidArgumentException | `format {format} is not a string`
FilterException          | `date {date} is not a Date object`

## Additional Information

File last updated: 2021-01-29T03:08:57.947Z
