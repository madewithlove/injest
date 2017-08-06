import { component, reducer } from './index';

it('can export correct modules', () => {
    expect(component).not.toBeNull();
    expect(reducer).not.toBeNull();
});
