import React, {Component} from 'react';
import {component as assert} from '../../dist/assertions';

class RealComponent extends Component {
    state = {text: 'foo'};

    onClick() {
        this.setState({text: 'bar'})
    }

    render() {
        return <p onClick={() => this.onClick()}>{this.state.text}</p>;
    }
}

test('can assert stuff about component', () => {
    const {tree, component} = assert(<RealComponent />);

    tree.props.onClick();
    assert(component);
});
