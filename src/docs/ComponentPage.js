import React from 'react';
import PropTypes from 'prop-types';
import Example from './Example';
import Props from './Props';
import Content from "doj-react-adminlte/Layout/Content";

const ComponentPage = ({component}) => {
    const {name, description, props, examples} = component;

    return (
        <Content header={name}>
            <p>{description}</p>
            <h4>Example{examples.length > 1 && "s"}</h4>
            {
                examples.length > 0 ?
                    examples.map( example => <Example key={example.code} example={example} componentName={name} /> ) :
                    "No examples exist."
            }

            <h4>Props</h4>
            {
                props ?
                    <Props props={props} /> :
                    "This component accepts no props."
            }
        </Content>
    );
};

ComponentPage.propTypes = {
    component: PropTypes.object.isRequired
};

export default ComponentPage;