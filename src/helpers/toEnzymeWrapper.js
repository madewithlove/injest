'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var React = require('react');
var enzyme_1 = require('enzyme');
function toEnzymeWrapper(tested, wrapper, CheerioWrapper) {
    if (CheerioWrapper === void 0) {
        CheerioWrapper = enzyme_1.mount;
    }
    // Unwrap and unify component format
    var Component = tested.WrappedComponent ? tested.WrappedComponent : tested;
    if (typeof tested === 'function') {
        tested = React.createElement(Component);
    }
    return wrapper(tested);
}
exports.default = toEnzymeWrapper;
