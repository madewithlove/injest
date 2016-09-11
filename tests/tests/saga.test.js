import React from 'react';
import {saga} from '../../dist/tests';

const dummySaga = function*(action) {
    yield action;
};

saga('can test saga', dummySaga({foo: 'bar'}));
saga('can test saga with result', dummySaga({foo: 'bar'}), [{action: {foo: 'bar'}}]);