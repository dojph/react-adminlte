import React from 'react';
import {Redirect} from 'react-router-dom';

import ComponentPage from "./ComponentPage";
import componentData from '../componentData';

const toCamelCase = (string) => {
    return string.replace(/(-\w)/g, function(m){return m[1].toUpperCase();})
        .replace(/^\w/, c => c.toUpperCase());
};

export default class ComponentDocs extends React.Component {
    render() {
        const componentName = toCamelCase(this.props.match.params.component);
        const component = componentData.find(component => component.name === componentName);

        if(!component) {
            return <Redirect to="/components/alert"/>;
        }

        return (
            <ComponentPage componentPath={`./components/${component.name}/`} component={component}/>
        );
    }
}