import {Store} from './';
import {getValue} from './lib/getValue';
import {setValue} from './lib/setValue';
import {removeValue} from './lib/removeValue';

type State = {
    x?: number | string;
    y?: number;
    z?: {y: {x?: boolean | string}};
};

for (let store of [new Store<State>()]) {
    console.log(store.constructor.name);
    let state: State, x: State['x'];

    store.onUpdate(() => {
        state = store.getState();
        x = store.get('x');
        let y = store.get(['z', 'y']);
    });

    store.setState({x: 1});
    console.assert(JSON.stringify(state) === JSON.stringify({x: 1}), 'initial state');
    console.assert(x === 1, 'initial x');

    store.setState({x: 2, y: 3});
    console.assert(JSON.stringify(state) === JSON.stringify({x: 2, y: 3}), 'update');
    console.assert(x === 2, 'update: x');

    store.set(['z', 'y'], {x: 'test'});
    console.assert(JSON.stringify(state) === JSON.stringify({x: 2, y: 3, z: {y: {x: 'test'}}}), 'nested update');
    console.assert(store.get(['z', 'y', 'x']) === 'test', 'nested update: z.y.x');

    store.set(['z', 'y'], {x: true});
    console.assert(store.get(['z', 'y', 'x']) === true, 'updated substate value');

    store.remove(['z', 'y', 'x']);
    console.assert(store.get(['z', 'y', 'x']) === undefined, 'remove nested, undefined value');
    console.assert(JSON.stringify(store.get(['z', 'y'])) === '{}', 'remove nested, parent object');
}

console.log('getValue, setValue, removeValue');

type YN = 'y' | 'n';
type Test = {
    a: number;
    b?: string;
    c?: {
        d?: {
            e?: boolean;
            f?: {
                g: YN;
            };
        },
        g?: string[];
        h?: number;
    };
};

let x: Test = {a: 1};
console.assert(getValue(x, 'a') === 1, 'x.a');
console.assert(getValue(x, ['a']) === 1, 'x[a]');
console.assert(getValue(x, 'b') === undefined, 'x.b initial');
setValue(x, 'b', 'test');
console.assert(getValue(x, 'b') === 'test', 'x.b changed');
setValue(x, ['a'], 2);
console.assert(getValue(x, 'a') === 2, 'x.a changed');
removeValue(x, 'b');
console.assert(getValue(x, 'b') === undefined, 'x.b removed');
console.assert(JSON.stringify(x) === JSON.stringify({a: 2}), 'x.b removed, json');
setValue(x, ['c', 'd', 'e'], true);
console.assert(JSON.stringify(x) === JSON.stringify({a: 2, c: {d: {e: true}}}), 'x.c.d.e added, json');
console.assert(getValue(x, ['c', 'd', 'e']) === true, 'x.c.d.e added');
setValue(x, ['c', 'd'], {f: {g: 'y'}});
console.assert(getValue(x, ['c', 'd', 'e']) === undefined, 'x.c.d assigned, no x.c.d.e');
console.assert(JSON.stringify(x) === JSON.stringify({a: 2, c: {d: {f: {g: 'y'}}}}), 'x.c.d assigned, json');
setValue(x, ['c', 'g'], ['test', 'word']);
console.assert(JSON.stringify(getValue(x, ['c', 'g'])) === JSON.stringify(['test', 'word']), 'x.c.g assigned');
console.assert(getValue(x, ['c', 'g', 1]) === 'word', 'x.c.g[1]');
setValue(x, ['c', 'g', 0], '!');
console.assert(JSON.stringify(getValue(x, ['c', 'g'])) === JSON.stringify(['!', 'word']), 'x.c.g[0] changed');
setValue(x, ['c', 'd', 'f', 'g'], 'n');
console.assert(getValue(x, ['c', 'd', 'f', 'g']) === 'n', 'x.d.f.g changed');
console.assert(getValue(x, ['c', 'h']) === undefined, 'x.c.h not yet defined');
removeValue(x, ['c', 'h']);
console.assert(getValue(x, ['c', 'h']) === undefined, 'x.c.h not yet defined, removed');
setValue(x, ['c', 'h'], -1);
console.assert(getValue(x, ['c', 'h']) === -1, 'x.c.h added');
removeValue(x, ['c', 'h']);
console.assert(getValue(x, ['c', 'h']) === undefined, 'x.c.h removed');
removeValue(x, 'c');
console.assert(JSON.stringify(x) === JSON.stringify({a: 2}), 'x.c removed, json');
