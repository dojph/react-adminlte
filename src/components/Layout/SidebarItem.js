import React from 'react';
import PropTypes from 'prop-types';

const Content = ({children}) => children || null;

class SidebarItem extends React.Component {
    handleClick = event => {
        event.preventDefault();
        this.props.onClick(this.props.id);
    };

    render() {
        return (
            <li className={this.props.active ? "active" : undefined}>
                <a href="" onClick={this.handleClick}>
                    {this.props.iconClass && <i className={this.props.iconClass} />}
                    <span>{this.props.label}</span>
                </a>
            </li>
        );
    }
}

SidebarItem.propTypes = {
    active: PropTypes.bool,
    id: PropTypes.string,
    iconClass: PropTypes.string,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func
};

SidebarItem.defaultProps = {
    active: false,
    id: "",
    iconClass: "",
    onClick: id => {}
};

SidebarItem.Content = Content;

export default SidebarItem;