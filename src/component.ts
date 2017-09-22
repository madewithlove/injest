import { mount, render } from 'enzyme';
import matchesSnapshot from './helpers/matchesSnapshot';
import toEnzymeWrapper from './helpers/toEnzymeWrapper';
import { ComponentClass, ReactElement, StatelessComponent } from 'react';
import withJestOptions, { JestOptions } from './helpers/withJestOptions';

export type ComponentFactory =
    | ReactElement<any>
    | StatelessComponent
    | ComponentClass;

export type ComponentCallback = (
    wrapper: any,
    matchesSnapshot: Function,
) => void;

function component(
    description: string | ComponentFactory,
    tested: ComponentFactory,
    callback?: ComponentCallback,
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
        if (callback) {
            callback(wrapper, matchesSnapshot);
        } else {
            matchesSnapshot(wrapper);
        }
    });
}

export default withJestOptions(component);
