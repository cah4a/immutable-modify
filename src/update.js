function clone(obj) {
    if (Array.isArray(obj)) {
        return [].concat(obj)
    }

    if (obj instanceof Object) {
        return Object.assign({}, obj)
    }

    throw `Can't rewrite scalars`
}

export default function update(obj, path, updater) {
    if (path.length === 0) {
        return obj
    }

    let iteratee = clone(obj)
    const result = iteratee

    while (path.length > 1) {
        const key = path.shift()
        iteratee = iteratee[key] = clone(iteratee[key] || {})
    }

    const key = path.shift()

    iteratee[key] = updater(iteratee[key])

    return result
}