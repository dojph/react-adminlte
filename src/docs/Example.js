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
            <div style={{marginTop: "20px"}}>
                { ExampleDescription && <ExampleDescription/>}
                <div style={{border: "1px solid #d2d6de", borderRadius: "4px"}}>
                    <div style={{padding: "20px", paddingTop: "20px"}}>
                        <ExampleComponent />
                    </div>
                    <CodeExample>{code}</CodeExample>
                </div>
            </div>
        )
    }
}

Example.propTypes = {
    example: PropTypes.object.isRequired,
    componentName: PropTypes.string.isRequired
};

export default Example;