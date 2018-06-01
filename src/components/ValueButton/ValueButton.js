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
    className: PropTypes.string,
    onClick: PropTypes.func,
};

export default ValueButton;