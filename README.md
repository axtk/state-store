[![npm](https://img.shields.io/npm/v/@axtk/store?labelColor=royalblue&color=royalblue&style=flat-square)](https://www.npmjs.com/package/@axtk/store) [![GitHub](https://img.shields.io/badge/-GitHub-royalblue?labelColor=royalblue&color=royalblue&style=flat-square&logo=github)](https://github.com/axtk/store) ![browser](https://img.shields.io/badge/browser-✓-345?labelColor=345&color=345&style=flat-square) ![node](https://img.shields.io/badge/node-✓-345?labelColor=345&color=345&style=flat-square) ![TypeScript](https://img.shields.io/badge/TypeScript-✓-345?labelColor=345&color=345&style=flat-square)

# @axtk/store

_A lightweight storage for shared state_

An instance of the `Store` class:
- is a storage for data shared across multiple components, which
- exposes a set of methods to manipulate the stored data (like `.mergeState(data)`), and
- allows for subscriptions to updates it receives (via `.onUpdate(handler)`).

In addition to this, the `ImmutableStore` class:
- maintains immutability of the store state.

## Store API

Both the `Store` and `ImmutableStore` classes have nearly identical APIs, with the only difference being the type of the `state` property. But in most cases, `state` of a store should be accessed and updated by means of the store methods and shouldn't be used directly.

### Initialization

```js
import {Store} from '@axtk/store';

const store = new Store();
// With an initial state:
// const store = new Store({location: {x: -1, y: 1}});
```

```js
import {ImmutableStore} from '@axtk/store';

const store = new ImmutableStore();
// With an initial state:
// const store = new ImmutableStore({location: {x: -1, y: 1}});
```

### Setters

```js
store.setState({location: {x: 1, y: 0}});
store.setState(store => {
    let nextState = /* ... */;
    return nextState;
});
```

```js
store.set('location.x', 1);
store.set(['location', 'x'], 1);
```

```js
store.mergeState({location: {y: 2}});
store.merge('location', {y: 2});
```

### Getters

```js
let state = store.getState();
let x = store.get('location.x');
let y = store.get(['location', 'y']);
// With a default value:
// let x = store.get('location.x', 0);
```

### Subscription

```js
let unsubscribe = store.onUpdate(store => {
    console.log('updated');
});
```

```js
unsubscribe(); // to remove the subscription
```

### Removal

```js
store.remove('location.x');
store.remove(['location', 'y']);
store.removeState();
```

## Also

- *[react-store](https://github.com/axtk/react-store)*, an extension of *store* with a React hook for shared state management
