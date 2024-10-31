# Remeda

The first "data-first" and "data-last" utility library designed especially for TypeScript.

## Documentation

Read the full docs and API reference on [remedajs.com/docs](https://remedajs.com/docs).

Migrating from other libraries? Check out our migration guides for [Lodash](https://remedajs.com/migrate/lodash) and [Ramda](https://remedajs.com/migrate/ramda)!

Interested in contributing? Read the [contributing guide](CONTRIBUTING.md).

## Features

- First-class TypeScript support, with types that are as specific as possible.
- Supports data-first (`R.filter(array, fn)`) and data-last (`R.filter(fn)(array)`) approaches.
- Lazy evaluation support with `pipe` and `piped`.
- Runtime and types are both extensively tested, with full code coverage.
- Tree-shakable, supports CJS and ESM.
- Fully documented with JSDoc, supports in-editor function documentation.

## Getting started

### Installation

```bash
ohpm install @mui/remeda
```

### Usage

```js
// Import everything:
import * as R from "remeda";

// Or import methods individually:
// import { pipe, tap, unique, take } from "remeda";

R.pipe(
  [1, 2, 2, 3, 3, 4, 5, 6],
  R.tap((value) => console.log(`Got ${value}`)),
  R.unique(),
  R.take(3),
); // => [1, 2, 3]

// Console output:
// Got 1
// Got 2
// Got 2
// Got 3
```

### Getting help

Questions, bug reports, and feature requests are tracked in [GitHub issues](https://github.com/remeda/remeda/issues).

## Contributors

<a href="https://github.com/remeda/remeda/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=remeda/remeda" />
</a>

Made with [contrib.rocks](https://contrib.rocks).
