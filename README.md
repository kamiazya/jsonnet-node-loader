[![NodeCI](https://github.com/kamiazya/jsonnet-node-loader/actions/workflows/node-ci.yaml/badge.svg)](https://github.com/kamiazya/jsonnet-node-loader/actions/workflows/node-ci.yaml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Open in Visual Studio Code](https://open.vscode.dev/badges/open-in-vscode.svg)](https://open.vscode.dev/kamiazya/jsonnet-node-loader)

# jsonnet-loader

A [loader](https://nodejs.org/api/esm.html#loaders) that allows Node.js to import [Jsonnet](https://jsonnet.org/) settings directly from an ESModule file.

## Features

- Support `.jsonnet` file

## Installation

If you're using the npm or yarn CLI, then add the plugin by:


[![NPM](https://nodei.co/npm/jsonnet-node-loader.png)](https://nodei.co/npm/jsonnet-node-loader/)


```bash
# yarn
$ yarn add -D jsonnet-node-loader
# or npm
$ npm install --save-dev jsonnet-node-loader
```

## Usage

### `loader` option

Specify jsonnet-node-loader in the loader option and execute the file.

Then, when the jsonnet file is imported, the evaluated value is returned.

```bash
$ node --experimental-loader jsonnet-node-loader example.mjs
{
  person1: { name: 'Alice', welcome: 'Hello Alice!' },
  person2: { name: 'Bob', welcome: 'Hello Bob!' }
}
```

<details open>
<summary>example.mjs</summary>

```js
import data from './example.jsonnet';

console.log(data);
```
</details>

<details open>
<summary>example.jsonnet</summary>

```jsonnet
{
  person1: {
    name: "Alice",
    welcome: "Hello " + self.name + "!",
  },
  person2: self.person1 { name: "Bob" },
}
```
</details>


### Advanced usage

When using `std.extVar(x)`, query parameters can be specified and passed when importing `vars.jsonnet`.


<details open>
<summary>vars.jsonnet</summary>

```jsonnet
{
  vars: {
    foo: std.extVar('foo'),
    var: std.extVar('bar'),
  },
}
```
</details>

<details open>
<summary>vars.mjs</summary>

```js
import data from './vars.jsonnet?foo=1&bar=2';

console.log(data);
// { vars: { foo: '1', var: '2' } }
```
</details>

</details>

## License

This software is released under the MIT License, see [LICENSE](./LICENSE).
