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
        wrapper.click('button');
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

### Assertions

Assertions helps you test things against _something_ within your tests, by default a Jest snapshot but you can
usually provide an explicit result to test against as last argument:

```js
import {assert, component, reducer, saga} from 'injest/assertions';

test('my test', () => {
    // Testing something against a snapshot
    assert(someFunction(argument));
    
    // Testing something against a result
    assert(someFunction(argument), 'foobar');
    
    // Testing a component against a snapshot
   component(<Icon />);
   
   // Testing a component more in depth
    const {tree, actual} = assert(<Icon />); // Assert initial output
    tree.props.onClick();
    assert(actual); // Trigger a prop and re-assert the output
   
   // Testing a reducer against a snapshot
   reducer(someReducer, stateBefore, {type: 'SOME_ACTION'});
   
   // Testing a reducer against a result
   reducer(someReducer, stateBefore, {type: 'SOME_ACTION'}, stateAfter);
   
   // Testing a saga against a snapshot
   saga(onLoggedIn({id: 1}))
   
   // Testing a saga against a result
   saga(onLoggedIn({id: 1}), [
       {
           action: call(::UserManager.login, 1),
           response: {...dummyUser},
       },
       {
           action: put(isLoggedIn()),
       }
   ])
});
```

## Testing

```shell
npm test
npm run lint
```
