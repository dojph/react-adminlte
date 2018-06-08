import React from 'react';
import PropTypes from 'prop-types';

class BreadcrumbItem extends React.Component {
    handleClick = event => {
        if(this.props.onClick) {
            event.preventDefault();
            this.props.onClick(this.props.path);
        }
    };

    render() {
        return (
            <li className={this.props.active ? "active" : null}>
                {
                    this.props.iconClass &&
                    <i className={this.props.iconClass + " margin-r-5"}/>
                }
                {
                    this.props.path ?
                        <a href={this.props.path} onClick={this.handleClick}>{this.props.label}</a> :
                        this.props.label
                }
            </li>
        );
    }
}

BreadcrumbItem.defaultProps = {
    active: false
};

BreadcrumbItem.propTypes = {
    active: PropTypes.bool,
    iconClass: PropTypes.string,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    path: PropTypes.string
};

export default BreadcrumbItem;