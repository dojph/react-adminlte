import React from 'react';
import PropTypes from 'prop-types';

class Alert extends React.Component {
    render() {
        const alertClass = `alert ${this.props.type}`;
        const iconClass = `icon ${this.props.iconClass}`;
        return (
            <div className={alertClass}>
                <button type="button" className="close" onClick={this.props.onClose} aria-hidden='true'>&times;</button>
                <h4>
                    <i className={iconClass} /> {this.props.title}
                </h4>
                {this.props.children}
            </div>
        );
    }
}

Alert.defaultProps = {
    iconClass: 'fa fa-info',
    title: 'Alert!',
    type: 'alert-info',
    onClose: () => {}
};

Alert.propTypes = {
    iconClass: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string,
    onClose: PropTypes.func
};

export default Alert;