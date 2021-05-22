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

```
const createBadgeFromInputs = require('github-badge-action');
createBadgeFromInputs();
```

## Inputs

### `label`

**Required** The left label of the badge, usually static.

### `label-color`

**Required** Hex or named color for the label. Default: `555`

### `status`

**Required** The right status as the badge, usually based on results.

### `color`

**Required** An array (comma separated) with hex or named colors of the badge value background. More than one creates gradient background. Default: `blue`.

### `style`

**Required** Badge style: flat or classic. Default: `classic`

### `icon`

Use icon.

### `icon-width`

Set this if icon is not square. Default: `13`

### `scale`

Set badge scale. Default: `1`

### `path`

The file path to store the badge image file. Only output to `badge` action output if not defined.

## Outputs

### `badge`

The badge SVG contents.
