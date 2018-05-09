import React from 'react';
import PropTypes from 'prop-types';
import SmoothCollapse from 'react-smooth-collapse';
import SidebarItem from "doj-react-adminlte/Layout/SidebarItem";

class SidebarTree extends React.Component {
    constructor(props) {
        super(props);

        // Check if there is an active child
        const children = React.Children.toArray(props.children);
        const activeChild = children.find(child => child.props.active);

        this.state = {
            treeOpen: Boolean(activeChild)
        };
    }

    toggleCollapse = event => {
        event.preventDefault();
        this.setState({treeOpen: !this.state.treeOpen});
    };

    render() {
        const children = React.Children.toArray(this.props.children);
        const items = children.filter(child => child.type === SidebarItem);
        const activeChild = children.find(child => child.props.active);
        const className = "treeview" +
            (this.state.treeOpen ? " menu-open" : "") +
            (this.props.active || activeChild ? " active" : "");

        const treeViewMenuStyle = {
            display: this.props.sidebarCollapsed ? 'none' : 'block',
            backgroundColor: 'rgb(44, 59, 65)'
        };

        return (
            <li className={className}>
                <a href="" onClick={this.toggleCollapse}>
                    {this.props.iconClass && <i className={this.props.iconClass}/>}
                    <span>{this.props.label}</span>
                    <span className="pull-right-container">
                        <i className="fa fa-angle-left pull-right"/>
                    </span>
                </a>
                <SmoothCollapse expanded={this.state.treeOpen} heightTransition=".40s ease">
                    <ul className="treeview-menu" style={treeViewMenuStyle}>
                        {items}
                    </ul>
                </SmoothCollapse>
            </li>
        );
    }
}

SidebarTree.propTypes = {
    iconClass: PropTypes.string,
    active: PropTypes.bool,
    label: PropTypes.string.isRequired,
    sidebarCollapsed: PropTypes.bool
};

SidebarTree.defaultProps = {
    active: false,
    sidebarCollapsed: false
};

export default SidebarTree;