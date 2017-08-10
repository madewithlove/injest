import reducer from './reducer';
import someReducer from './__dummies__/dummyReducer';

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
