import { mount, render } from 'enzyme';
import matchesSnapshot from './helpers/matchesSnapshot';
import toEnzymeWrapper, { EnzymeWrapper } from './helpers/toEnzymeWrapper';
import { ComponentClass, ReactElement, StatelessComponent } from 'react';
import withJestOptions, { JestOptions } from './helpers/withJestOptions';
import ComponentTester from './Testers/ComponentTester';

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
    tested?: ComponentFactory,
    callback?: ComponentCallback | string,
    it?: jest.It,
) {
    const tester = new ComponentTester().setTester(it);
    const numberArgs = [description, tested, callback].filter(
        value => typeof value !== 'undefined',
    ).length;

    switch (true) {
        case numberArgs === 1 && typeof description !== 'string':
            return tester.setComponent(description as ComponentFactory).run();

        case numberArgs === 2:
            return tester
                .setDescription(description as string)
                .setComponent(tested)
                .run();

        case numberArgs === 3 && typeof callback === 'string':
            return tester
                .setDescription(description as string)
                .setComponent(tested)
                .onlySelector(callback as string)
                .run();

        case numberArgs === 3 && typeof callback === 'function':
            return tester
                .setDescription(description as string)
                .setComponent(tested)
                .setCallback(callback as Function)
                .run();
    }
}

export default withJestOptions(component);
