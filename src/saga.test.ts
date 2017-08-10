import { put } from 'redux-saga/effects';
import dummySaga from './__dummies__/dummySaga';
import saga from './saga';

const action = { type: 'INCREMENT' };

saga('can snapshot saga for a given action', dummySaga, action);

saga('can snapshot saga at various points', dummySaga, action, it => {
    it.will('yield some piece of text').then('a put action', put(action));
});

saga('can also snapshot against an array', dummySaga, action, [
    'type: INCREMENT',
    put(action),
]);
