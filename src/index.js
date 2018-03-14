import update from './update'

const pathToString = (path) => Array.isArray(path) ? path.join('.') : path

const makePath = (path) => Array.isArray(path) ? path : ('' + path).split('.')

export function set(obj, path, value) {
    if (value instanceof Function) {
        return update(obj, makePath(path), value)
    }

    return update(obj, makePath(path), () => value)
}

export function push(obj, path, item) {
    return update(obj, makePath(path), value => {
        if (Array.isArray(value)) {
            return value.concat(item)
        }

        throw `Can't push item by path '${pathToString(path)}': leaf is not an array`
    })
}

export function merge(obj, path, item) {
    return update(obj, makePath(path), value => {
        if (value instanceof Object || value === undefined) {
            const hasNoUpdates = value && Object.keys(item).every(
                key => value[key] === item[key],
            )

            if (hasNoUpdates) {
                return value
            }

            return Object.assign({}, value, item)
        }

        throw `Can't merge items by path '${pathToString(path)}': leaf is not an object`
    })
}


export function remove(obj, path) {
    const accessPath = makePath(path)
    const key = accessPath.pop()

    const doRemove = value => {
        if (Array.isArray(value)) {
            if (value.length <= key) {
                return value
            }

            return value.slice(0, key).concat(value.slice(key + 1))
        }

        if (value instanceof Object) {
            if (!value.hasOwnProperty(key)) {
                return value
            }

            const result = Object.assign({}, value)
            delete result[key]
            return result
        }

        if (value === undefined) {
            throw `Can't remove items by path '${pathToString(path)}': parent leaf is not exists`
        }

        throw `Can't remove items by path '${pathToString(path)}': parent leaf is not an object or array`
    }

    if (accessPath.length > 0) {
        return update(obj, accessPath, doRemove)
    } else {
        return doRemove(obj)
    }
}