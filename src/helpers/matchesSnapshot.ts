import toJson from 'enzyme-to-json';

export function matchesSnapshot(wrapper) {
    expect(toJson(wrapper)).toMatchSnapshot();
}
