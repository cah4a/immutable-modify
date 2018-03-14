function clone(obj) {
    if (Array.isArray(obj)) {
        return [].concat(obj)
    }

    if (obj instanceof Object) {
        return Object.assign({}, obj)
    }

    throw `Can't rewrite scalars`
}

function get(obj, path) {
    let iteratee = clone(obj)

    while (path.length > 1) {
        const key = path.shift()

        if (!iteratee.hasOwnProperty(key)) {
            return {}
        }

        iteratee = iteratee[key]
    }

    return iteratee[path.shift()]
}

function set(obj, path, value) {
    let iteratee = clone(obj)
    const result = iteratee

    while (path.length > 1) {
        const key = path.shift()
        iteratee = iteratee[key] = clone(iteratee[key] || {})
    }

    const key = path.shift()
    iteratee[key] = value

    return result
}

export default function update(obj, path, updater) {
    if (path.length === 0) {
        return obj
    }

    const oldValue = get(obj, clone(path))
    const newValue = updater(oldValue)

    if (newValue === oldValue) {
        // nothing was changed, return old object
        return obj
    }

    return set(obj, clone(path), newValue)
}