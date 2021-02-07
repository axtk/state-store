# store

_A lightweight shared state manager_

An instance of the `Store` class:
- is a storage for data shared across multiple components, which
- exposes a set of methods to manipulate the stored data (like `.mergeState(data)`),
- allows for subscriptions to updates it receives (via `.onUpdate(handler)`),
- internally builds upon immutable data structures.
