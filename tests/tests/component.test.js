import React, {Component} from 'react';
import {component} from '../../dist/tests';

const DummyComponent = props => <p {...props} />;

component('can test component', <DummyComponent foo="bar" />);
