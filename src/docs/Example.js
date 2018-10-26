import React from 'react';
import PropTypes from 'prop-types';
import CodeExample from './CodeExample';

class Example extends React.Component {
    toggleCode = event => {
        event.preventDefault();
        this.setState(prevState => {
            return {showCode: !prevState.showCode};
        });
    };

    render() {
        const {code, description, name} = this.props.example;
        // Must use CommonJS require to dynamically require because ES Modules must be statically analyzable.
        const ExampleComponent = require(`./components/${this.props.componentName}/${name}`).default;
        return (
            <div className="example">
                {description && <h4>{description}</h4> }

                <ExampleComponent />
                <CodeExample>{code}</CodeExample>
            </div>
        )
    }
}

Example.propTypes = {
    example: PropTypes.object.isRequired,
    componentName: PropTypes.string.isRequired
};

export default Example;