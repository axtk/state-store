import Store from './';

let store = new Store();
let state, x;

store.onUpdate(() => {
    state = store.getState();
    x = store.get('x');
});

store.mergeState({x: 1, y: 3});
console.assert(JSON.stringify(state) === JSON.stringify({x: 1, y: 3}), 'initial state');
console.assert(x === 1, 'initial x');

store.mergeState({x: 2, z: 'test'});
console.assert(JSON.stringify(state) === JSON.stringify({x: 2, y: 3, z: 'test'}), 'updated state');
console.assert(x === 2, 'updated x');
