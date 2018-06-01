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

    static getDerivedStateFromProps(props, state) {
        if(props.openIndex >= 0 && props.openIndex !== props.index) {
            return {
                treeOpen: false
            };
        }

        return null;
    }

    toggleCollapse = event => {
        event.preventDefault();
        this.props.onToggleCollapse(this.props.index, !this.state.treeOpen);
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
            backgroundColor: '#2c3b41'
        };

        return (
            <li className={className}>
                <a href="" onClick={this.toggleCollapse}>
                    {this.props.iconClass && <i className={this.props.iconClass}/>}
                    <span>{this.props.label}</span>
                    {
                        !this.props.sidebarCollapsed &&
                        <span className="pull-right-container">
                            <i className="fa fa-angle-left pull-right"/>
                        </span>
                    }
                </a>
                {
                    !this.props.sidebarCollapsed &&
                    <SmoothCollapse expanded={this.state.treeOpen} heightTransition=".50s ease">
                        <ul className="treeview-menu" style={treeViewMenuStyle}>
                            {items}
                        </ul>
                    </SmoothCollapse>
                }
                {
                    this.props.sidebarCollapsed &&
                    <ul className="treeview-menu">
                        {items}
                    </ul>
                }
            </li>
        );
    }
}

SidebarTree.defaultProps = {
    active: false,
    onToggleCollapse: () => {},
    sidebarCollapsed: false
};

SidebarTree.propTypes = {
    active: PropTypes.bool,
    iconClass: PropTypes.string,
    index: PropTypes.number,
    openIndex: PropTypes.number,
    label: PropTypes.string.isRequired,
    onToggleCollapse: PropTypes.func,
    sidebarCollapsed: PropTypes.bool
};

export default SidebarTree;