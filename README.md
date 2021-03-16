[![npm](https://img.shields.io/npm/v/@axtk/store?labelColor=royalblue&color=royalblue&style=flat-square)](https://www.npmjs.com/package/@axtk/store)
![browser](https://img.shields.io/badge/browser-✓-blue?labelColor=dodgerblue&color=dodgerblue&style=flat-square)
![node](https://img.shields.io/badge/node-✓-blue?labelColor=dodgerblue&color=dodgerblue&style=flat-square)

_A lightweight storage for shared state_

An instance of the `Store` class:
- is a storage for data shared across multiple components, which
- exposes a set of methods to manipulate the stored data (like `.mergeState(data)`), and
- allows for subscriptions to updates it receives (via `.onUpdate(handler)`).

If a store's `state` is an array or a plain object (which it typically is), data chunks that have been put into the store or retrieved from the store should be treated as read-only, because modifying them directly (e.g. without prior copying) will cause changes in the store state without its listeners being notified.

# Also

- *[react-store](https://github.com/axtk/react-store)*, an extension of *store* with React hooks
