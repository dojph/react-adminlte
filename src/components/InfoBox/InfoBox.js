import React from 'react';
import PropTypes from 'prop-types';

class InfoBox extends React.Component {
    render() {
        const colorClass = "info-box-icon " + this.props.colorClass;

        return (
            <div className="col-md-3 col-sm-6 col-xs-12">
                <div className="info-box">
                    <span className={colorClass}>
                        <i className={this.props.iconClass}/>
                    </span>
                    <div className="info-box-content">
                        <span className="info-box-text">{this.props.label}</span>
                        <span className="info-box-number">{this.props.children}</span>
                    </div>
                </div>
            </div>
        );
    }
}

InfoBox.defaultProps = {
    colorClass: "",
    label: "",
};

InfoBox.propTypes = {
    /** The color of the InfoBox. */
    colorClass: PropTypes.string,
    /** InfoBox Icons. Check AdminLTE for the list of icons available. */
    iconClass: PropTypes.string.isRequired,
    /** Defines the label of the InfoBox. */
    label: PropTypes.string
};

export default InfoBox;