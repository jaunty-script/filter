# json

This filter is used to convert a JSON string into the type that it represents, such as an object or array.

## Arguments

argument        | type      | default | description
--------------- | --------- | ------- | ------------------------------------------
value           | `unknown` |         | The value to filter.
shouldAllowNull | `boolean` | `false` | Determines if `null` values are allowed to pass through.

## Filtered value

The type that the JSON string represented.
This value can be anything that `JSON.parse` can return.

If the value was `null` and `shouldAllowNull` was set to `true`, then `null` will be returned.

## Error conditions

error                    | message
------------------------ | ----------------------------------------------------
InvalidArgumentException | `shouldAllowNull {shouldAllowNull} is not a boolean`
FilterException          | `JSON failed validation with message "{message}"`
FilterException          | `Value cannot be null`
FilterException          | `Value {value} is not a string`

## Additional Information

File last updated: 2021-01-29T03:08:57.947Z
