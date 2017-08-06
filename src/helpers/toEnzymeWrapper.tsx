import { mount } from 'enzyme';
import * as React from 'react';

export default function toEnzymeWrapper(tested, wrapper = mount) {
    // Unwrap and unify component format
    const Component = tested.WrappedComponent
        ? tested.WrappedComponent
        : tested;
    if (typeof tested === 'function') {
        tested = <Component />;
    }

    return wrapper(tested);
}
