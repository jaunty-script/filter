# Filter

This library allows you to validate, transform, and filter data according to a given specification.
It is based on the [filter-php](https://github.com/traderinteractive/filter-php) library by [traderinteractive](https://github.com/traderinteractive).

## Quick Start

The following example shows a typical invocation of the filterer and a test of the response.

```js
import Filterer from '@jaunty-script/filter'; // import the package

// create the specification
const specification = {
  id: {
    filters: [        // define the filters for the id field
      ['uint'],       // try to convert to an unsigned integer
    ],
    required: true,   // require the id field to be defined
  },
  values: [           // define the filters (shorthand) for the value field
    ['string'],       // ensure the value is a string
    ['split', ','],   // split the value into an array on comma delimiters
  ],
};

// set any options that you want to change
const options = {
  allowUnknowns: true, // allow fields not in the specification to be defined
};

// create the filterer
const filterer = new Filterer(specification, options);

// filter a value
const result = filterer.execute({
  id: '100',
  name: 'this is an unknown field',
  values: 'one,two,three,four',
});

expect(result.success).toStrictEqual(true);
expect(result.errors).toStrictEqual([]);
expect(result.errorMessage).toStrictEqual(null);
expect(result.filteredValue).toStrictEqual({
  id: 100,
  values: ['one', 'two', 'three', 'four'],
});
expect(result.unknowns).toStrictEqual({
  name: 'this is an unknown field',
});
```

## Filters

- [array](./doc/filters/array.md)
- [arrayize](./doc/filters/arrayize.md)
- [bool](./doc/filters/bool.md)
- [boolConvert](./doc/filters/boolConvert.md)
- [compressString](./doc/filters/compressString.md)
- [concat](./doc/filters/concat.md)
- [date](./doc/filters/date.md)
- [dateFormat](./doc/filters/dateFormat.md)
- [flatten](./doc/filters/flatten.md)
- [float](./doc/filters/float.md)
- [in](./doc/filters/in.md)
- [int](./doc/filters/int.md)
- [json](./doc/filters/json.md)
- [object](./doc/filters/object.md)
- [ofObject](./doc/filters/ofObject.md)
- [ofScalar](./doc/filters/ofScalar.md)
- [redact](./doc/filters/redact.md)
- [split](./doc/filters/split.md)
- [string](./doc/filters/string.md)
- [stripTags](./doc/filters/stripTags.md)
- [translate](./doc/filters/translate.md)
- [uint](./doc/filters/uint.md)
- [validateJSON](./doc/filters/validateJSON.md)

## Additional Information

* [LICENSE](./LICENSE)

<small>File last updated: 2020-03-12T06:25:19.873Z</small>
