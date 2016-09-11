import React from 'react';
import {fromJS} from 'immutable';
import {reducer, reducerTestFactory} from '../../dist/tests';

const dummyReducer = (state, action) => fromJS({state, action});

reducer('can test reducer', dummyReducer, {foo: 'bar'}, {type: 'FOO'});
reducer('can test reducer with result', dummyReducer, {foo: 'bar'}, {type: 'FOO'}, {state: {foo: 'bar'}, action: {type: 'FOO'}});

const tester = reducerTestFactory(dummyReducer);
const before = {foo: 'bar'};
const action = {type: 'FOO'};
const after = {state: {foo: 'bar'}, action: {type: 'FOO'}};

tester('can test reducer with factory', before, action);
tester('can test reducer with factory and result', before, action, after);
tester('can do multiple assertions', assert => {
    assert(before, action);
    assert(before, action, after);
});