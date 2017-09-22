export default (state = 0, action = {}) => {
    return action.type === 'INCREMENT' ? ++state : --state;
};
