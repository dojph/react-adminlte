import React from 'react';
import PropTypes from 'prop-types';

class ValueButton extends React.Component {
    handleClick = event => {
        event.stopPropagation();
        this.props.onClick(this.props.value);
    };

    render() {
        const {value: a, onClick: b, ...props} = this.props;
        return <button onClick={this.handleClick} {...props}/>;
    }
}

ValueButton.defaultProps = {
    onClick: () => {}
};

ValueButton.propTypes = {
    /** className gets and sets the value of the class attribute of the specified element. You can also add a CSS class in this prop to style a particular element.*/
    className: PropTypes.string,

    /** When the button is clicked, the corresponding function that is binded in this prop will trigger.*/
    onClick: PropTypes.func,

    /** The value prop specifies the initial value for a ValueButton.*/
     value: PropTypes.any
};

export default ValueButton;