import React from "react";

export function asFormComponent(Component) {
    class FormComponent extends React.Component {
        render() {
            return (<Component {...this.props}/>);
        }
    }
    FormComponent.isFormComponent = true;
    return FormComponent;
}