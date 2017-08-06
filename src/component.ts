import * as React from 'react';
import { mount, render } from 'enzyme';
import { matchesSnapshot } from './helpers/matchesSnapshot';
import toEnzymeWrapper from './helpers/toEnzymeWrapper';
import { ReactElement } from 'react';

export type ComponentCallback = (
    wrapper: any,
    matchesSnapshot: Function,
) => void;

export default function component(
    description: string | ReactElement<any>,
    tested: ReactElement<any>,
    callback?: ComponentCallback,
) {
    if (!tested) {
        return matchesSnapshot(
            toEnzymeWrapper(description as ReactElement<any>),
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
