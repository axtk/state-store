[![npm](https://img.shields.io/npm/v/@axtk/store?labelColor=royalblue&color=royalblue&style=flat-square)](https://www.npmjs.com/package/@axtk/store)
![browser](https://img.shields.io/badge/browser-✓-blue?labelColor=dodgerblue&color=dodgerblue&style=flat-square)
![node](https://img.shields.io/badge/node-✓-blue?labelColor=dodgerblue&color=dodgerblue&style=flat-square)

_A lightweight storage for shared state_

An instance of the `Store` class:
- is a storage for data shared across multiple components, which
- exposes a set of methods to manipulate the stored data (like `.mergeState(data)`), and
- allows for subscriptions to updates it receives (via `.onUpdate(handler)`).

The data stored in the store's `state` is typically a mutable entity (an object or an array), and in typical use cases it will make sense to treat the data that has been passed to the store's getter methods or retrieved from the setter methods as read-only, so as not to cause changes in parts of the internal state of the store without its listeners being notified.

# Also

- *[react-store](https://github.com/axtk/react-store)*, an extension of *store* with React hooks
