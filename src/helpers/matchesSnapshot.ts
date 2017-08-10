import toJson from 'enzyme-to-json';

export default function matchesSnapshot(wrapper) {
    expect(toJson(wrapper)).toMatchSnapshot();
}
