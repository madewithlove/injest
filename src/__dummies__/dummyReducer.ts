export default (state = 0, { type }) => {
    return type === 'INCREMENT' ? ++state : --state;
};
