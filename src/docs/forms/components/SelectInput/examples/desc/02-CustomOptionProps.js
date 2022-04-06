import React from 'react';

class CustomOptionProps extends React.Component {
    render() {
        return (
            <>
                <h4>Custom Option Object Properties</h4>
                <p>
                    You can also use a custom array of options that don't have
                    <code>label</code> and <code>value</code> properties. For this, you
                    just need to specify the <code>getOptionLabel</code> and
                    <code>getOptionValue</code> callbacks
                </p>
                <ul>
                    <li>
                        <code>getOptionLabel</code> accepts a callback that exposes
                        an option object for its parameter. The returned value should be
                        the object's property to be displayed as the option's label
                    </li>
                    <li>
                        <code>getOptionValue</code> accepts a callback that exposes
                        an option object for its parameter. The returned value should be
                        the object's property to be used for shallow comparison in the
                        array of options. This should return a unique value for each
                        of the options in the <code>options</code> property.
                    </li>
                </ul>
            </>
        )
    }
}

export default CustomOptionProps;