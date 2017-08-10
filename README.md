# Injest [![Build Status](https://travis-ci.org/madewithlove/injest.svg?branch=master)](https://travis-ci.org/madewithlove/injest)

Makes your Jest tests more digestible.

## Installation

```bash
npm i jest injest --save-dev
# Or
yarn add injest --dev
```

## Usage

Injest provides various helpers to write smaller and quickers tests for your application.

### Component helper

```js
import * as React from 'react';
import component from './src/component';
import DummyComponent from './src/__dummies__/DummyComponent';

component('can create snapshots easily', <DummyComponent text="bar" />);
component("can accept a component factory if you're lazy", DummyComponent);
component(
    'provides access to the Enzyme wrapper if need be',
    <DummyComponent text="bar" />,
    (wrapper, snapshot) => {
        // You can snapshot the wrapper at any type
        snapshot(wrapper.find('.some-div'));

        // Instance of Enzyme's mount wrapper
        wrapper.find('button').simulate('click');
        snapshot(wrapper);
    },
);
```

### Reducer helper

```js
import reducer from './src/reducer';
import someReducer from './src/__dummies__/dummyReducer';

const initialState = 0;

reducer('can snapshot the result of an action', someReducer, initialState, {
    type: 'INCREMENT',
});

reducer(
    'can also assert against a specific result',
    someReducer,
    initialState,
    { type: 'INCREMENT' },
    1,
);
reducer(
    'can do multiple of these for a given reducer',
    someReducer,
    initialState,
    wrapper => {
        wrapper({ type: 'INCREMENT' }); // Assert result equals snapshot
        wrapper({ type: 'INCREMENT' }, 1); // Assert result equals given value
    },
);

const thisReducer = reducer(
    'can return a shortcut factory with few arguments',
    someReducer,
    initialState,
);

thisReducer('which can then be used as such', { type: 'INCREMENT' });
thisReducer('or as such', { type: 'INCREMENT' }, 1);
thisReducer('or even as such', wrapper => {
    wrapper({ type: 'INCREMENT' });
    wrapper({ type: 'INCREMENT' }, 1);
});
```

### Saga helper

```js
import { put } from 'redux-saga/effects';
import saga from './src/saga';

function* dummySaga({ type }) {
    yield `type: ${type}`;
    yield put({ type });
}

const action = { type: 'INCREMENT' };

saga('can snapshot saga for a given action', dummySaga, action);

saga('can snapshot saga at various points', dummySaga, action, it => {
    it
        .will('yield some piece of text')
        .then('a put action', put(action));
});

saga('can also snapshot against an array', dummySaga, action, [
    'type: INCREMENT',
    put(action),
]);
```

## Testing

```shell
yarn test
yarn lint
```
