import * as React from 'react';
import ComponentTester from './ComponentTester';
import DummyComponent from '../__dummies__/DummyComponent';

new ComponentTester()
    .setDescription('can test components')
    .setComponent(<DummyComponent />)
    .run();

new ComponentTester()
    .setDescription('can access callback for advanced operations')
    .setComponent(<DummyComponent />)
    .then((wrapper, snapshot) => {
        snapshot(wrapper.find('.some-div'));
    });

new ComponentTester()
    .setDescription('can access callback for advanced operations')
    .setComponent(<DummyComponent text="foo" />)
    .then((wrapper, snapshot) => {
        snapshot(wrapper.find('.some-div'));
    });
