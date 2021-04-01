import type {Map as ImmutableMap} from 'immutable';

export type State = any;
export type ImmutableState = ImmutableMap<any, any>;

export type PathComponent = string | number;
export type Path = string | PathComponent[];
