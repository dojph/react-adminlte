import React from 'react';
import PropTypes from 'prop-types';

class Form extends React.Component {
    handleChange = (field, value) => {
        if(field) {
            this.props.onChange(field, value);
        }
    };

    isFormElement = childType => {
        return !!childType.isFormComponent;
    };

    recursiveCloneChildren = children => {
        return React.Children.map(
            children,
            child => {
                let childProps = {};
                if (React.isValidElement(child) && this.isFormElement(child.type)) {
                    childProps = {
                        ...this.props,
                        disabled: this.props.disabled || child.props.disabled,
                        onChange: this.handleChange
                    };
                    return React.cloneElement(child, childProps);
                }
                if (child && child.props) {
                    childProps.children = this.recursiveCloneChildren(child.props.children);
                    return React.cloneElement(child, childProps);
                }
                return child;
            }
        );
    };

    render() {
        return this.recursiveCloneChildren(this.props.children) || null;
    }
}

Form.defaultProps = {
    errors: {},
    onChange: () => {},
    onEnterKey: () => {}
};

Form.propTypes = {

    /** Bind the error message' object in this prop that will be executed when the validation failed.*/
    errors: PropTypes.object,

    /** The corresponding function that is binded in this prop will trigger when the value of an element has been changed.*/
    onChange: PropTypes.func,

    /** The corresponding function that is binded in this prop will trigger when the enter key was pressed.*/
    onEnterKey: PropTypes.func
};

export default Form;