import React from 'react';

class Header extends React.Component {
    render() {
        return (
            <div>
                <h3 className="box-title">{this.props.title}</h3>
                {this.props.children}
            </div>
        );
    }
}

Header.defaultProps = {
    title: ""
};

export default Header;