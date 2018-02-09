import update from './update'

const key = (path) => Array.isArray(path) ? path.join('.') : path

export function set(obj, path, value) {
    if(value instanceof Function){
        return update(obj, path, value)
    }

    return update(obj, path, () => value)
}

export function push(obj, path, item) {
    return update(obj, path, value => {
        if (Array.isArray(value)) {
            return value.concat(item)
        }

        throw `Can't push item by path '${key(path)}': leaf is not an array`
    })
}

export function merge(obj, path, item) {
    return update(obj, path, value => {
        if (value instanceof Object || value === undefined) {
            return Object.assign({}, value, item)
        }

        throw `Can't merge items by path '${key(path)}': leaf is not an object`
    })
}