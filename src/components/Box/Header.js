import React from 'react';
import PropTypes from 'prop-types';

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

Header.propTypes = {
    title: PropTypes.string
};

export default Header;