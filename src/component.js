import {mount, render} from 'enzyme';
import {matchesSnapshot} from './helpers/matchesSnapshot';
import toEnzymeWrapper from './helpers/toEnzymeWrapper';

export default function component(description, tested, callback) {
    if (!tested) {
        return matchesSnapshot(toEnzymeWrapper(description));
    }

    it(description, () => {
        const wrapper = toEnzymeWrapper(tested, callback ? mount : render);
        if (callback) {
            callback(wrapper, matchesSnapshot);
        } else {
            matchesSnapshot(wrapper);
        }
    });
}
