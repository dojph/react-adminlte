import React from 'react';
import PropTypes from 'prop-types';

import CalendarInput from "./CalendarInput";
import CheckBox from "./CheckBox";
import FileInput from "./FileInput";
import Radio from "./Radio";
import RadioGroup from "./RadioGroup";
import SelectInput from "./SelectInput";
import TextArea from "./TextArea";
import TextInput from "./TextInput";

class Form extends React.Component {
    handleChange = (field, value) => {
        if(field) {
            this.props.onChange(field, value);
        }
    };

    isFormElement = childType => {
        return [TextInput, TextArea, CalendarInput, SelectInput, Radio, RadioGroup,
            CheckBox, FileInput].includes(childType);
    };

    recursiveCloneChildren = children => {
        return React.Children.map(
            children,
            child => {
                let childProps = {};
                if(React.isValidElement(child) && React.Component.prototype.isPrototypeOf(child.type.prototype) &&
                    this.isFormElement(child.type)) {
                    childProps = {...this.props, onChange: this.handleChange};
                }
                if(child && child.props) {
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
    errors: PropTypes.object,
    onChange: PropTypes.func,
    onEnterKey: PropTypes.func
};

export default Form;