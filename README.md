[![Test](https://github.com/emibcn/github-badge-action/actions/workflows/test.js.yml/badge.svg)](https://github.com/emibcn/github-badge-action/actions/workflows/test.js.yml)
![Coverage](https://raw.githubusercontent.com/emibcn/github-badge-action/badges/main/test-coverage.svg)
![Test generated badge](https://raw.githubusercontent.com/emibcn/github-badge-action/badges/main/test-badge.svg)

# GitHub Badge action

This module generates a SVG badge using GitHub Actions inputs and outputs. The badge is generated using the NPM package [gradient-badge](https://github.com/bokub/gradient-badge) and echoed as a GitHub Action output, and saved into a file if a `path` is given. This is the core of the GitHub Action [Badge action](https://github.com/marketplace/actions/badge-action).

## Install
With `npm`:
```shell
npm install github-badge-action
```

With `yarn`:
```shell
yarn add github-badge-action
```

## Usage

```javascript
const { createBadgeFromInputs } = require('github-badge-action');
createBadgeFromInputs();
```

## Inputs

Inputs are read from action's inputs using `core.input`, fixed and passed directly to `gradient-badge`.

### Change input names
The input names are taken from `createBadgeFromInputs`'s `inputMap` argument, which has this deafults:
```javascript
const defaultInputMap = {
  label: 'label',
  labelColor: 'label-color',
  status: 'status',
  gradient: 'color',
  style: 'style',
  icon: 'icon',
  iconWidth: 'icon-width',
  scale: 'scale',
  path: 'path',
};
```

You can import it and modify just some of the options names:
```javascript
const {
  createBadgeFromInputs,
  defaultInputMap
} = require('github-badge-action');

createBadgeFromInputs({
  inputMap: {
    ...defaultOptionsMap,
    gradient: 'gradient',
    path: 'file',
  },
));
```

### Change input fixes
Once the inputs are read, some **fixes are applied**. The default ones are:
```javascript
const defaultInputFixes = {
  // Ensure string
  status: (status) => `${status}`,

  // Ensure null if empty
  icon: (icon) => icon?.length ? icon : null,

  // Color gradient as Array
  gradient: (gradient) => gradient
      .split(',')
      // Clean spaces
      .map((color) => color.trim(' ')),
};
```

You can also change the fixes applied to the inputs, or add more using `inputFixes` option:
```javascript
const {
  createBadgeFromInputs,
  defaultInputFixes
} = require('github-badge-action');

createBadgeFromInputs({
  inputFixes: {
    ...defaultInputFixes,
    // Color gradient as Array, split with a pipe '|' instead of a comma ','
    gradient: (gradient) => gradient
        .split('|')
        // Clean spaces
        .map((color) => color.trim(' ')),
    },
));
```

### Available options
#### `label`

**Required** The left label of the badge, usually static.

#### `label-color`

**Required** Hex or named color for the label. Default: `555`

#### `status`

**Required** The right status as the badge, usually based on results.

#### `color`

**Required** An array (comma separated) with hex or named colors of the badge value background. More than one creates gradient background. Default: `blue`.

#### `style`

**Required** Badge style: flat or classic. Default: `classic`

#### `icon`

Use icon.

#### `icon-width`

Set this if icon is not square. Default: `13`

#### `scale`

Set badge scale. Default: `1`

#### `path`

The file path to store the badge image file. Only output to `badge` action output if not defined.

## Outputs

### `badge`
Once the badge is generated, the SVG contents are written to an action output (by default). The name of the output can be modified using `outputName` option:
```javascript
createBadgeFromInputs({
  outputName: 'badge-svg-custom'
});
```

If the option is `null` or empty, **output will not be written**. The default option name is `badge`.
