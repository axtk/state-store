// @see https://github.com/sindresorhus/type-fest/blob/main/source/get.d.ts

export type NestedProperty<BaseType, Keys extends PropertyKey | readonly PropertyKey[]> =
    Keys extends keyof BaseType
    ? BaseType[Keys]
    : Keys extends []
    ? BaseType
    : Keys extends [infer Head, ...infer Tail]
    ? NestedProperty<PropertyOf<BaseType, Extract<Head, PropertyKey>>, Extract<Tail, PropertyKey[]>>
    : never;

type ConsistsOnlyOf<T, Substring extends string> =
    T extends string ?
    T extends ''
    ? true
    : T extends `${Substring}${infer Tail}`
    ? ConsistsOnlyOf<Tail, Substring>
    : false
    : false;

type WithStringKeys<BaseType extends Record<string | number, any>> = {
    [Key in `${Extract<keyof BaseType, string | number>}`]: BaseType[Key];
};

type StringDigit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

type PropertyOf<BaseType, Key extends PropertyKey> =
    BaseType extends null | undefined
    ? undefined
    : Key extends keyof BaseType
    ? BaseType[Key]
    : BaseType extends [] | [unknown, ...unknown[]]
    ? unknown
    : BaseType extends {
        [n: number]: infer Item;
        length: number;
    }
    ? (
        ConsistsOnlyOf<Key, StringDigit> extends true
        ? Item
        : unknown
    )
    : Key extends keyof WithStringKeys<BaseType>
    ? WithStringKeys<BaseType>[Key]
    : unknown;


// @see https://stackoverflow.com/a/58436959

type Cons<H, T> = T extends readonly any[] ?
    ((h: H, ...t: T) => void) extends ((...r: infer R) => void) ? R : never
    : never;

type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20, ...0[]];

export type KeyPath<T, D extends number = 5> = ([D] extends [never] ? never : T extends object ?
    { [K in keyof T]-?: [K] | (KeyPath<T[K], Prev[D]> extends infer P ?
        P extends [] ? never : Cons<K, P> : never
    ) }[keyof T]
    : []) | keyof T;
