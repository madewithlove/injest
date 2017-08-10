import * as React from 'react';

const DummyComponent: React.SFC<{ text?: string }> = ({ text }) =>
    <div>
        <p>
            {text || 'foobar'}
        </p>
    </div>;

export default DummyComponent;
