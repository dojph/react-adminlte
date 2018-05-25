import React from 'react';
import SidebarTree from "doj-react-adminlte/Layout/SidebarTree";

class Sidebar extends React.Component {
    render() {
        return React.Children.map(this.props.children, child => child.type === SidebarTree ?
            React.cloneElement(child, {sidebarCollapsed: this.props.sidebarCollapsed}) : child);
    }
}

export default Sidebar;