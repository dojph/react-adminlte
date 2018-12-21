import React from 'react';
import PropTypes from 'prop-types';
import Example from './Example';
import Props from './Props';

import Content from "doj-react-adminlte/Content";
import BreadcrumbItem from "doj-react-adminlte/Content/BreadcrumbItem";

class ComponentPage extends React.Component {
    render() {
        const {name, props, examples} = this.props.component;
        let Description;
        try {
            Description = require(`./components/${name}/`).default;
        } catch {
            Description = null;
        }

        return (
            <Content>
                <Content.Header title={name}/>
                <Content.Breadcrumb>
                    <BreadcrumbItem label="Components" iconClass="fa fa-wrench"/>
                    <BreadcrumbItem label={name} active/>
                </Content.Breadcrumb>
                <Content.Body>
                    { Description && <Description/> }
                    <h4><strong>Examples</strong></h4>
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
    }
}

ComponentPage.propTypes = {
    component: PropTypes.object.isRequired
};

export default ComponentPage;