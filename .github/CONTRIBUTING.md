## Opening Issues

If you find a bug or have a suggestion for a new feature, feel free to open an issue!
Please be descriptive and include code snippets if possible.

## Contributing Code

Pull requests are welcome!
Simply fork the repository and open a pull request from your fork to the `master` branch.

Please try to be as descriptive as possible when writing the pull request description.
If your pull request fixes an issue, please include a reference to that issue in the description.

### Commit Standards

Commit messages should be descriptive of the changes being made and should be in the form of a sentence, but should not exceed 50 characters.
`fix` is not a good commit message, while `Fixed string length issue` is.
Normal sentence capitalization is preferred, but is not a strict requirement.

Small commits are welcome, but please squash down any intermediate commits.
For instance, if you are adding a new feature, a commit where you adjust or fix something in your new feature should be squashed down into the commit where the feature is added.

### Coding Standards

This project enforces coding standards which are based off of the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript).

The following rules differ from the Airbnb Style Guide:

#### [7.1](https://github.com/airbnb/javascript#functions--declarations) Use named function expressions instead of function declarations.

This rule is disabled for functions, for the following reasons:

* Defining functions at the top of a class file distracts from the class definition.
* Assigning named functions to variables can cause confusion as the function now has two names.
* This library exclusively uses classes, which largely prevent functions from being called before they are defined.

The potential confusion and clunkiness is not worth the benefits, in this case.

### Unit Tests

This project enforces 100% code coverage. Tests are written using [Jest](https://jestjs.io/) and are located in the `/test` folder.

#### Writing tests for classes

Tests should be written for each method of a class, even if the functionality is covered in tests for other methods.

#### Using mocks

[Class mocks](https://jestjs.io/docs/en/es6-class-mocks) should be avoided as much as possible. Dependency injection should be used instead.
```js
// bad
class Widget {
  constructor() {
    this.gizmo = new Gizmo();
  }
}
...
jest.mock('Gizmo');

// good
class Widget {
  constructor(options = {}) {
    const {
      gizmo = new Gizmo(),
    } = options;
    this.gizmo = gizmo;
  }
}
...
const widget = new Widget({ gizmo: mockGizmo });
```

#### Using spies

[Spies](https://jestjs.io/docs/en/jest-object#jestspyonobject-methodname) should be used sparingly.
Testing the effects or result of a method produces more meaningful tests.

```js
// bad
const widget = new Widget();
jest.spyOn(widget.blink);
widget.activate();
expect(widget.blink).toHaveBeenCalled();

// good
const widget = new Widget({ blinker: mockBlinker });
widget.activate();
expect(mockBlinker).toHaveBeenCalled();

// good
const widget = new Widget();
const result = widget.activate();
expect(result.blinked).toStrictEqual(true);
```
