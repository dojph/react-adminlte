import React from 'react';
import PropTypes from 'prop-types';
import Example from './Example';
import Props from './Props';

import Content from "doj-react-adminlte/Content";
import BreadcrumbItem from "doj-react-adminlte/Content/BreadcrumbItem";

const ComponentPage = ({component}) => {
    const {name, description, props, examples} = component;

    return (
        <Content>
            <Content.Header title={name}/>
            <Content.Breadcrumb>
                <BreadcrumbItem label="Components" iconClass="fa fa-wrench"/>
                <BreadcrumbItem label={name} active/>
            </Content.Breadcrumb>
            <Content.Body>
                <p>{description}</p>
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
            </Content.Body>
        </Content>
    );
};

ComponentPage.propTypes = {
    component: PropTypes.object.isRequired
};

export default ComponentPage;