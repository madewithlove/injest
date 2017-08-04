import React from 'react';
import component from './component';

const DummyComponent = ({text}) => <div><p>{text || 'foobar'}</p></div>;

component('can write snapshot test', <DummyComponent text="hello" />);
component('can pass component as function', DummyComponent);
component('can receive wrapper', DummyComponent, (wrapper, snapshot) => {
   snapshot(wrapper.find('p'));
});
