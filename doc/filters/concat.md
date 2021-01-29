# concat

This filter is used to prepend a prefix and append a suffix to a filtered value.

## Arguments

argument | type      | default | description
-------- | --------- | ------- | ------------------------------------------
value    | `unknown` |         | The value to filter.
prefix   | `string`  | `''`    | The string to prepend to the value.
suffix   | `string`  | `''`    | The string to append to the value.

## Filtered value

The original string with the prefix prepended and the suffix appended (e.g. `{prefix}{value}{suffix}`);

## Error conditions

error                    | message
------------------------ | ------------------------------------------------
InvalidArgumentException | `prefix {prefix} is not a string`
InvalidArgumentException | `suffix {suffix} is not a string`
FilterException          | `Value {value} is not a string`
FilterException          | `Value {value} cannot be cast to a string`

## Additional Information

File last updated: 2021-01-29T03:08:57.947Z
