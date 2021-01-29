# compressString

This filter is used to normalize whitespace within a string by "compressing" all whitespace sections into single space characters.

## Arguments

argument                  | type      | default | description
------------------------- | --------- | ------- | -------------------------------------------------------
value                     | `unknown` |         | The value to filter.
replaceVerticalWhitespace | `boolean` | `false` | Determines if vertical whitespace should be compressed.

## Filtered value

The original value with any whitespace sections reduced to a single space character each.
If `replaceVerticalWhitespace` was set to `true`, this will include any vertical whitespace such as newline characters.

## Error conditions

error                    | message
------------------------ | -------------------------------------------------------------------------
InvalidArgumentException | `replaceVerticalWhitespace {replaceVerticalWhitespace} is not a boolean`
FilterException          | `Value {value} is not a string`
FilterException          | `Value {value} cannot be cast to a string`

## Additional Information

File last updated: 2021-01-29T03:08:57.947Z
