import { Collection as ImmutableCollection } from 'immutable';

export default function toPlain(value) {
    return value instanceof ImmutableCollection ? value.toJS() : value;
};

// @test
// expect(toPlain({ foo: 'bar' })).toEqual({ foo: 'bar' });

// @test
// import { fromJS } from 'immutable';
// expect(toPlain(fromJS({ foo: 'bar' }))).toEqual({ foo: 'bar' });

// @test
// expect(toPlain(['foo', 'bar'])).toEqual(['foo', 'bar']);

// @test
// import { fromJS } from 'immutable';
// expect(toPlain(fromJS(['foo', 'bar']))).toEqual(['foo', 'bar']);

// @test
// import { Map as ImmutableMap } from 'immutable';
// expect(toPlain(new ImmutableMap().setIn(['foo', 'bar'], 1))).toEqual({ foo: { bar: 1 } });
