type Something = object | string | Array | boolean | number

type KeyPath = string | Array[string|number]

export function set(
    object: Something,
    keyPath: KeyPath,
    value: Something | ((leaf: any) => any)
): Something;

export function push(
    object: Something,
    keyPath: KeyPath,
    item: Array | Something
): Something;

export function merge(
    object: Something,
    keyPath: KeyPath,
    item: Object
): Something;

export function remove(
    object: Something,
    keyPath: KeyPath
): Something;