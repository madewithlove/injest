import {assertions, tests} from '../dist';

it('can export correct modules', () => {
    expect(assertions.component).not.toBeUndefined();
    expect(tests.component).not.toBeUndefined();
});
