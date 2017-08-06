import reducer from './reducer';

const dummyReducer = (state = 0, { type }) => {
    return type === 'INCREMENT' ? ++state : --state;
};

reducer('can snapshot action', dummyReducer, 0, { type: 'INCREMENT' });
reducer(
    'can snapshot with explicit after state',
    dummyReducer,
    0,
    { type: 'INCREMENT' },
    1,
);
reducer('can do multiple operations', dummyReducer, 0, wrapper => {
    wrapper({ type: 'INCREMENT' });
    wrapper({ type: 'DECREMENT' }, -1);
});
