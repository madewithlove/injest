import { mount, render } from 'enzyme';
import matchesSnapshot from './helpers/matchesSnapshot';
import toEnzymeWrapper, { EnzymeWrapper } from './helpers/toEnzymeWrapper';
import { ComponentClass, ReactElement, StatelessComponent } from 'react';
import withJestOptions, { JestOptions } from './helpers/withJestOptions';

export type ComponentFactory =
    | ReactElement<any>
    | StatelessComponent
    | ComponentClass;

export type ComponentCallback = (
    wrapper: EnzymeWrapper,
    matchesSnapshot: Function,
) => void;

function component(
    description: string | ComponentFactory,
    tested: ComponentFactory,
    callback?: ComponentCallback | string,
    tester?: jest.It,
) {
    if (!tested) {
        return matchesSnapshot(
            toEnzymeWrapper(description as ComponentFactory),
        );
    }

    tester = tester || it;
    tester(description as string, () => {
        const wrapper = toEnzymeWrapper(tested, callback ? mount : render);
        if (typeof callback === 'string') {
            matchesSnapshot(wrapper.find(callback));
        } else if (typeof callback === 'function') {
            callback(wrapper, matchesSnapshot);
        } else {
            matchesSnapshot(wrapper);
        }
    });
}

export default withJestOptions(component);
