import React from 'react';
import {Redirect} from 'react-router-dom';

import ComponentPage from './ComponentPage';
import formData from '../formData';

const toCamelCase = (string) => {
    return string.replace(/(-\w)/g, function(m){return m[1].toUpperCase();})
        .replace(/^\w/, c => c.toUpperCase());
};

export default class FormDocs extends React.Component {
    render() {
        const item = toCamelCase(this.props.match.params.item);

        if(item === "Usage") {
            return <ComponentPage componentPath={`./forms/`} component={formData} title="Forms"/>;
        }

        const component = formData.components.find(component => component.name === item);

        if(!component) {
            return <Redirect to="/forms/usage"/>;
        }

        return <ComponentPage componentPath={`./forms/components/${component.name}/`} component={component}/>;
    }
}