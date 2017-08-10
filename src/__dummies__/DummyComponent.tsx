import * as React from 'react';

const DummyComponent: React.SFC<{ text?: string }> = ({ text }) =>
    <div>
        <div className="some-div">hello</div>
        <button>
            {text || 'foobar'}
        </button>
    </div>;

export default DummyComponent;
