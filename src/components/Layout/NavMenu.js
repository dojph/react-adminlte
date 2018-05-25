import React from 'react';

class NavMenu extends React.Component {
    render() {
        return (
            <div className="navbar-custom-menu">
                <ul className="nav navbar-nav">
                    {this.props.children}
                </ul>
            </div>
        );
    }
}

export default NavMenu;