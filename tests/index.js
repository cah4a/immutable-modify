import {set, push, merge, remove} from '../src/index.js'

describe('set fn', () => {
    it('sets', () => {
        const o = {a: 1}
        const u = set(o, 'a', 2)

        expect(u).toEqual({a: 2})
        expect(u).not.toBe(o)
    })

    it('work with arrays', () => {
        const o = [1, 2]
        const u = set(o, o.length, 3)

        expect(u).toEqual([1, 2, 3])
        expect(u).not.toBe(o)
    })

    it('creates elements', () => {
        const u = set({}, ['foo', 'bar'], 2)
        expect(u).toEqual({foo: {bar: 2}})
    })

    it('sets nested', () => {
        const o = {a: {}, b: {}, foo: {bar: {baz: 2}}}
        const u = set(o, ['foo', 'bar', 'baz'], 3)

        expect(u).toEqual({a: {}, b: {}, foo: {bar: {baz: 3}}})

        expect(u).not.toBe(o)
        expect(u.foo).not.toBe(o.foo)
        expect(u.foo.bar).not.toBe(o.foo.bar)

        expect(u.a).toBe(o.a)
        expect(u.b).toBe(o.b)
    })

    it('works with function', () => {
        const o = {a: 1, b: 2, foo: {bar: {baz: 2}}}
        const u = set(o, ['foo', 'bar', 'baz'], (value) => {
            expect(value).toBe(2)
            return value + 10
        })

        expect(u).toEqual({a: 1, b: 2, foo: {bar: {baz: 12}}})

        expect(u).not.toBe(o)
        expect(u.foo).not.toBe(o.foo)
        expect(u.foo.bar).not.toBe(o.foo.bar)

        expect(u.a).toBe(o.a)
        expect(u.b).toBe(o.b)
    })

    it('works with arrays', () => {
        const o = {
            a: {},
            b: {},
            foo: [
                {a: {}},
                {a: {}},
            ],
        }
        const u = set(o, ['foo', 0, 'a'], 3)

        expect(u).toEqual({
            a: {},
            b: {},
            foo: [
                {a: 3},
                {a: {}},
            ],
        })

        expect(u).not.toBe(o)
        expect(u.foo).not.toBe(o.foo)
        expect(u.foo[0]).not.toBe(o.foo[0])

        expect(u.foo[1]).toBe(o.foo[1])
        expect(u.a).toBe(o.a)
        expect(u.b).toBe(o.b)
    })

    it('not modify if empty key', () => {
        const o = {a: 1}
        const u = set(o, [], 2)

        expect(u).toBe(o)
    })
})

describe('push fn', () => {
    it('pushes', () => {
        const o = {foo: [{a: 1}, {a: 2}], bar: {}}
        const u = push(o, 'foo', {a: 3})

        expect(u).toEqual({foo: [{a: 1}, {a: 2}, {a: 3}], bar: {}})
        expect(u.foo).not.toBe(o.foo)
        expect(u.bar).toBe(o.bar)
        expect(u.foo[0]).toBe(o.foo[0])
        expect(u.foo[1]).toBe(o.foo[1])
    })

    it('pushes arrays', () => {
        const o = {foo: [1, 2], bar: {}}
        const u = push(o, 'foo', [3, 4])

        expect(u).toEqual({foo: [1, 2, 3, 4], bar: {}})
        expect(u.foo).not.toBe(o.foo)
        expect(u.bar).toBe(o.bar)
    })

    it('error on push to not array', () => {
        expect(() => {
            push({foo: 3}, 'foo', 4)
        }).toThrow();
    })
})

describe('merge fn', () => {
    it('merges', () => {
        const o = {foo: {a: {}}, bar: {}}
        const u = merge(o, 'foo', {b: 2})

        expect(u).toEqual({foo: {a: {}, b: 2}, bar: {}})
        expect(u.foo).not.toBe(o.foo)
        expect(u.bar).toBe(o.bar)
        expect(u.foo.a).toBe(o.foo.a)
    })

    it('sets on merge', () => {
        const o = {bar: {}}
        const u = merge(o, 'foo', {b: 2})

        expect(u).toEqual({foo: {b: 2}, bar: {}})
        expect(u.foo).not.toBe(o.foo)
        expect(u.bar).toBe(o.bar)
    })

    it('error on scalar update', () => {
        expect(() => {
            merge({foo: 3}, ['foo', 'bar'], {b: 2})
        }).toThrow();
    })

    it('error on merge to not object', () => {
        expect(() => {
            merge({foo: 3}, 'foo', {})
        }).toThrow();
    })
})

describe('remove fn', () => {
    it('removes', () => {
        const o = {foo: {bar: 1, baz: 2}}
        const u = remove(o, 'foo.bar')

        expect(u).toEqual({foo: {baz: 2}})
        expect(u).not.toBe(o)
        expect(u.foo).not.toBe(o.foo)
        expect(u.foo.baz).toBe(o.foo.baz)
    })

    it('removes first level', () => {
        const o = {foo: {bar: 1, baz: 2}}
        const u = remove(o, 'foo')

        expect(u).toEqual({})
        expect(u).not.toBe(o)
    })

    it('removes from array', () => {
        const o = {foo: [0, 1, 2]}
        const u = remove(o, 'foo.0')

        expect(u).toEqual({foo: [1, 2]})
        expect(u).not.toBe(o)
        expect(u.foo).not.toBe(o.foo)
    })

    it('error on path is not exists', () => {
        expect(() => {
            remove({bar: {baz: 1}}, 'foo.bar')
        }).toThrow();
    })

    it('error on path is not array or object', () => {
        expect(() => {
            remove({foo: 3}, 'foo.bar')
        }).toThrow();
    })
})