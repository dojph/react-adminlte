import React from 'react';

class SimpleUsage extends React.Component {
    render() {
        return (
            <>
                <h4>Simple Usage</h4>
                <p>
                    Out of the box, the component accepts an array of object options,
                    with the <code>label</code> prop as the option text to be displayed and
                    the <code>value</code> prop as the unique option identifier used for
                    shallow comparison.
                </p>
            </>
        );
    }
}

export default SimpleUsage;