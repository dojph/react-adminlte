import React from 'react';
import PropTypes from 'prop-types';
import CodeExample from './CodeExample';

class Example extends React.Component {
    constructor(props) {
        super(props);
        const {name} = props.example;

        // Must use CommonJS require to dynamically require because ES Modules must be statically analyzable.
        this.exampleComponent = require(`./components/${this.props.componentName}/examples/${name}`).default;
        try {
            this.exampleDescription = require(`./components/${this.props.componentName}/examples/desc/${name}`).default;
        } catch {
            this.exampleDescription = null;
        }
    }

    toggleCode = event => {
        event.preventDefault();
        this.setState(prevState => {
            return {showCode: !prevState.showCode};
        });
    };

    render() {
        const {code} = this.props.example;

        const ExampleComponent = this.exampleComponent;
        const ExampleDescription = this.exampleDescription;

        return (
            <div className="example">
                { ExampleDescription && <ExampleDescription/>}
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