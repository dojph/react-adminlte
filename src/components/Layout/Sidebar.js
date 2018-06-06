import React from 'react';
import SidebarTree from "./SidebarTree";

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openIndex: -1
        };
    }

    handleToggleCollapse = (index, isOpen) => {
        if(isOpen) {
            this.setState({openIndex: index});
        }
    };

    render() {
        let treeCount = 0;
        return React.Children.map(this.props.children, child => {
            if(child && child.type === SidebarTree) {
                return React.cloneElement(child,
                    {
                        index: treeCount++,
                        openIndex: this.state.openIndex,
                        sidebarCollapsed: this.props.sidebarCollapsed,
                        onToggleCollapse: this.handleToggleCollapse
                    }
                );
            } else {
                return child;
            }
        });
    }
}

export default Sidebar;