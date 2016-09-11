# Injest

Makes your Jest tests more digestible.

## Installation

```shell
npm i jest injest --save-dev
```

## Usage

Injest provides various helpers to write smaller and quickers tests for your application. Helpers come in two flavors: snapshots and tests.

### Assertions

Assertions helps you test things against _something_ within your tests, by default a Jest snapshot but you can
usually provide an explicit result to test against as last argument:

```js
import {component, reducer, saga} from 'injest/assertions';

test('my test', () => {
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

### Tests

Tests are the same functions but wrapped in a way that let your write tests in a smaller and cleaner manner.
Underneath they call `test` with the provided description and then call the function above with the rest of the arguments.

```js
import {component, reducer, saga} from 'injest/tests';

component('can be rendered', <Icon />);
reducer('can process some action', someReducer, stateBefore, {type: 'SOME_ACTION'});
saga('can log user in', onLoggedIn());
```

As reducers usually have a lot of tests and repeatedly passing the reducer could be cumbersome, a reducer test factory is provided:
 
```js
import {reducerTestFactory} from 'injest/tests';

const reducer = reducerTestFactory(myReducer);

reducer('can process foo', stateBefore, {type: 'FOO'});
reducer('can process bar', stateBefore, {type: 'BAR'});
reducer('can process multiple scenarios', assert => {
    assert(stateBefore, {type: 'FOO'}, stateAfter);
    assert(stateBefore, {type: 'BAR'});
});
```

## Testing

```shell
npm test
npm run lint
```