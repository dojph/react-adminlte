import React from 'react';
import PropTypes from 'prop-types';

class Alert extends React.Component {
    render() {
        const alertClass = `alert ${this.props.type}`;
        const iconClass = `icon ${this.props.iconClass}`;
        return this.props.show &&
            <div className={alertClass}>
                <button type="button" className="close" onClick={this.props.onClose} aria-hidden='true'>&times;</button>
                <h4>
                    <i className={iconClass} /> {this.props.title}
                </h4>
                {this.props.children}
            </div>
        ;
    }
}

Alert.defaultProps = {
    iconClass: 'fa fa-info',
    title: 'Alert!',
    type: 'alert-info',
    show: true,
    onClose: () => {}
};

Alert.propTypes = {
    /** Alert Icons. Check AdminLTE for the list of icons available.*/
    iconClass: PropTypes.string,

    /** If true, displays the component. */
    show: PropTypes.bool,

    /** The title header of your Alert component.*/
    title: PropTypes.string,

    /** Distinguishes an alert. It can be a danger, warning, info and success alert.*/
    type: PropTypes.string,

    /** The function that is binded in this prop will execute after you click the close button.*/
    onClose: PropTypes.func
};

export default Alert;