import { fromJS } from 'immutable';
import { assert } from './assert';

it('can assert something', () => {
    assert(true, true);
});

it('can convert immutable objects', () => {
    assert(fromJS({ foo: 'bar' }), { foo: 'bar' });
});
