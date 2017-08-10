import { mount, render } from 'enzyme';
import matchesSnapshot from './helpers/matchesSnapshot';
import toEnzymeWrapper from './helpers/toEnzymeWrapper';
import { ComponentClass, ReactElement, StatelessComponent } from 'react';

export type ComponentFactory =
    | ReactElement<any>
    | StatelessComponent
    | ComponentClass;

export type ComponentCallback = (
    wrapper: any,
    matchesSnapshot: Function,
) => void;

export default function component(
    description: string | ComponentFactory,
    tested: ComponentFactory,
    callback?: ComponentCallback,
) {
    if (!tested) {
        return matchesSnapshot(
            toEnzymeWrapper(description as ComponentFactory),
        );
    }

    it(description as string, () => {
        const wrapper = toEnzymeWrapper(tested, callback ? mount : render);
        if (callback) {
            callback(wrapper, matchesSnapshot);
        } else {
            matchesSnapshot(wrapper);
        }
    });
}
