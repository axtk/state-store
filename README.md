[![npm](https://img.shields.io/npm/v/@axtk/store?labelColor=royalblue&color=royalblue&style=flat-square)](https://www.npmjs.com/package/@axtk/store)
![browser](https://img.shields.io/badge/browser-✓-blue?labelColor=dodgerblue&color=dodgerblue&style=flat-square)
![node](https://img.shields.io/badge/node-✓-blue?labelColor=dodgerblue&color=dodgerblue&style=flat-square)

_A lightweight storage for shared state_

An instance of the `Store` class:
- is a storage for data shared across multiple components, which
- exposes a set of methods to manipulate the stored data (like `.mergeState(data)`), and
- allows for subscriptions to updates it receives (via `.onUpdate(handler)`).

# Also

- *[react-store](https://github.com/axtk/react-store)*, an extension of *store* with React hooks
