# immutable-modify

Slim zero dependencies helper function for modifying redux state or frozen objects

Easily create updated version of your Plain Javascript Object.
Function will create new references to objects or arrays when nested data is changed and leave references otherwise.
That allows `react` and `react-redux` to fast check your props using reference equality.

## Analogs
 
- [immutability-helper](https://github.com/kolodny/immutability-helper)
- [immutable-set](https://github.com/M6Web/immutable-set)
- [immutable-setter](https://github.com/bormind/immutable-setter)
- [imset](https://github.com/brigand/imset)
- [immutability-util](https://github.com/hustcc/immutability-util)

## Install

```
yarn add immutable-modify
```

or 

```
npm install --save immutable-modify
```

## Api

### set(object, keyPath, value)

Arguments:

- **object (Object)**: The object modify
- **keyPath (string | Array)**: The path of the property to set
- **value (any | (leaf) => any)**: The value to set or update function

Returns:

(Object): Returns object

```javascript
import {set} from 'immutable-modify'

const state = {user: {name: 'Skywalker'}}

// same as set(state, ['user', 'name'], 'Dart Vader')
const newState = set(state, 'user.name', 'Dart Vader') 

// newState is now {user: {name: 'Dart Vader'}}

newState === state // false
newState.user === state.user // false
```

Also `value` could be function:

```javascript
import {set} from 'immutable-modify'

const state = {user: {name: 'Skywalker', isJedi: false}, settings: {}}

const newState = set(state, 'user.isJedi', (isJedi) => !isJedi)
// newState is now {user: {name: 'Skywalker', isJedi: true}}

newState === state // false
newState.user === state.user // false
newState.settings === state.settings // true
```

### push(object, path, item)

```javascript
import {push} from 'immutable-modify'

const state = {sequence: [{a: 1}, {a: 2}]}

const newState = push(state, 'sequence', {a: 3})
// newState is now {sequence: [{a: 1}, {a: 2}, {a: 3}]}

newState === state // false
newState.sequence === state.sequence // false
newState.sequence[0] === state.sequence[0] // true
newState.sequence[1] === state.sequence[1] // true
```


### merge(object, path, item)

```javascript
import {merge} from 'immutable-modify'

const state = {product: {name: 'sepulka'}}

const newState = merge(state, 'product', {description: 'Best with sepulator'})
// newState is now {product: {name: 'sepulka', description: 'Best with sepulator'}}

newState === state // false
newState.product === state.product // false
newState.product.name === state.product.name // true
```

### remove(object, path)

```javascript
import {remove} from 'immutable-modify'

const state = {product: {name: 'sepulka', isAvailable: true}}

const newState = remove(state, 'product.isAvailable')
// newState is now {product: {name: 'sepulka'}}

newState === state // false
newState.product === state.product // false
```

## Test

```
yarn test
```