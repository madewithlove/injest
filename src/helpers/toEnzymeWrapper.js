import React from 'react';
import {mount} from 'enzyme';

export default function toEnzymeWrapper(tested, wrapper = mount) {
    // Unwrap and unify component format
    const Component = tested.WrappedComponent ? tested.WrappedComponent : tested;
    if (typeof tested === 'function') {
        tested = <Component />;
    }

    return wrapper(tested);
}
